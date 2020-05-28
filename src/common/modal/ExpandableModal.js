import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../config';

const deviceHeight = Dimensions.get('window').height;

export class ExpandableModal extends Component {
  // Calculate offset values by device height. Used in PanResponder and animations
  _expandedOffset = this.props.expandedOffset * deviceHeight;
  _visibleOffset = this.props.visibleOffset * deviceHeight;
  

  // Requiring threshold be be less than half of it's height.
  // Prevents situations where users are unable to close modal.
  maxVisibleSwipeThreshold = Math.min(
    (deviceHeight - this._visibleOffset) / 2,
    this.props.swipeThreshold
  );


  // Init animated values
  modalOffset = new Animated.Value(deviceHeight);
  currentPanOffset = new Animated.Value(0);
  currentModalOffset = Animated.add(this.modalOffset, this.currentPanOffset);


  // Handle user gestures/panning
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderStart: (e, gs) => {
      // Parent hook for swipeStart
      if (this.props.onSwipeStart) {
        this.props.onSwipeStart(e, gs);
      }
    },

    onPanResponderMove: (e, gs) => {
      // Update offset of the modal to include y change
      this.currentPanOffset.setValue(gs.dy);

      // Parent hook for onSwipe. Should likely should be throttled
      if (this.props.onSwipe) {
        this.props.onSwipe(e, gs);
      };
    },

    onPanResponderRelease: (e, gs) => {
      const { _value } = this.currentPanOffset;
      const { isExpanded, swipeThreshold, isVisible } = this.props;

      // console.log('modalOffset', this.modalOffset._value);
      // console.log('currentPanOffset', this.currentPanOffset._value);

      // console.log('modalRef', this.modalRef._children[0].viewConfig.validAttributes.bottom);
      // console.log('ref', this.modalRef);
      // console.log('measure', this.modalRef._children[0].measure());
      // console.log('measureLayout', this.modalRef._children[0].measureLayout());
      // console.log('measureInWindow', this.modalRef._children[0].measureInWindow());

      // Modal exceeds top of screen
      if (this.modalOffset._value <= 0) {
        if (this.modalOffset._value + gs.dy >= 0) {
          this.animateToExpanded();
          this.resetUserPan();
        } else {
          // console.log(1)
          this.modalOffset.setValue(this.currentPanOffset._value += this.modalOffset._value);
          this.currentPanOffset.setValue(0);
        }

      } else if (isExpanded) {
        // User swiping to collapse fully expanded modal
        if (_value > 0 && Math.abs(_value) > swipeThreshold) {
          console.log(2)
          this.props.onSwipeToCollapse(e, gs);
          this.resetUserPan(this.props.collapseAnimationDuration)
        } else if (_value > 0 && Math.abs(_value) < swipeThreshold) {
          console.log(3)
          this.resetUserPan();
        }

      } else if (isVisible) {
        // User swiping to close modal
        if (_value > 0 && Math.abs(_value) > this.maxVisibleSwipeThreshold) {
          console.log(4)
          this.props.onSwipeToHide(e, gs);
          this.resetUserPan(this.props.hideAnimationDuration);
        
        // User swiping to expand modal
        } else if (_value < 0 && Math.abs(_value) > this.maxVisibleSwipeThreshold) {
          console.log(5)
          this.props.onSwipeToExpand(e, gs);
          this.resetUserPan(this.props.expandAnimationDuration)
        }
      }
      
      // Parent hook when swipeThreshold not met
      if (this.props.onSwipeCancel) {
        this.props.onSwipeCancel(e, gs);
      }
    }
  });


  // Modal animations
  animateModalOffset = (toValue, time, cb) => {
    Animated.timing(this.modalOffset, {
      toValue,
      duration: time || this.props.defaultAnimationDuration,
      useNativeDriver: false,
    }).start(cb);
  };

  animateToVisible = () => this.animateModalOffset(
    this._visibleOffset,
    this.props.showAnimationDuration,
    this.props.onShowModalComplete,
  );

  animateToCollapsed = () => this.animateModalOffset(
    this._visibleOffset,
    this.props.collapseAnimationDuration,
    this.props.onCollapseModalComplete,
  )

  animateToExpanded = () => this.animateModalOffset(
    this._expandedOffset,
    this.props.expandAnimationDuration,
    this.props.onExpandModalComplete,
  );

  animateToHidden = () => this.animateModalOffset(
    deviceHeight,
    this.props.hideAnimationDuration,
    this.props.onHideModalComplete,
  );


  // User-pan animations
  animatePanOffset = (toValue, time, cb) => {
    Animated.timing(this.currentPanOffset, {
      toValue,
      duration: time || this.props.defaultAnimationDuration,
      useNativeDriver: false,
    }).start(cb);
  };

  resetUserPan = time => this.animatePanOffset(0, time);


  // Lifecycles
  componentDidUpdate(prevProps) {
    const { isExpanded, isVisible } = this.props;

    if (!prevProps.isExpanded && isExpanded) {
      this.animateToExpanded();
    } else if (prevProps.isExpanded && !isExpanded) {
      this.animateToCollapsed();
    } else if (!prevProps.isVisible && isVisible) {
      this.animateToVisible();
    } else if (prevProps.isVisible && !isVisible) {
      this.animateToHidden();
    }
  }

  render() {
    return (
      <Animated.View
        ref={ ref => this.modalRef = ref }
        style={[
          styles.modal,
          { 
            backgroundColor: this.props.backgroundColor || Colors.White,
            top: this.currentModalOffset
          }
        ]}
        { ...this.panResponder.panHandlers }
      >
        <View style={ styles.content }>
          { this.props.children }
        </View>
      </Animated.View>
    )
  }
}

ExpandableModal.propTypes = {
  cancelSwipeAnimationDuration: PropTypes.number, // Milliseconds
  collapseAnimationDuration: PropTypes.number, // Milliseconds
  defaultAnimationDuration: PropTypes.number, // Milliseconds
  expandAnimationDuration: PropTypes.number, // Milliseconds
  expandedOffset: PropTypes.number, // Expanded Modal offset from top of screen (Float b/n 0 and 1)
  onCollapseModalComplete: PropTypes.func, // callback
  onExpandModalComplete: PropTypes.func, // callback
  onHideModalComplete: PropTypes.func, // hook passing event 
  onShowModalComplete: PropTypes.func, // hook passing event and gestureState
  onSwipeCancel: PropTypes.func, // hook passing event and gestureState
  onSwipeToCollapse: PropTypes.func.isRequired, // set isExpanded to false in parent
  onSwipeToHide: PropTypes.func.isRequired, // set isVisible to false in parent
  onSwipeToExpand: PropTypes.func.isRequired, // set isExpanded to true in parent
  showAnimationDuration: PropTypes.number, // Milliseconds for modal to animate in from bottom of the screen
  swipeThreshold: PropTypes.number, // Threshold distance for swipe to trigger animation
  visibleOffset: PropTypes.number, // Visible (shown) Modal offset from top of screen (Float b/n 0 and 1)
};


ExpandableModal.defaultProps = {
  defaultAnimationDuration: 300,
  expandedOffset: 0,
  swipeThreshold: 200,
  visibleOffset: 0.7,
}


const styles = {
  content: {
    minHeight: '100%',
    // flex: 1,
  },
  modal: {
    // backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
};



// import React, { Component } from 'react';
// import {
//   Animated,
//   Dimensions,
//   PanResponder,
//   View,
// } from 'react-native';
// import PropTypes from 'prop-types';

// const deviceHeight = Dimensions.get('window').height;

// export class ExpandableModal extends Component {
//   // Calculate offset values by device height. Used in PanResponder and animations
//   _expandedOffset = this.props.expandedOffset * deviceHeight;
//   _visibleOffset = this.props.visibleOffset * deviceHeight;
  
//   // Requiring threshold be be less than half of it's height.
//   // Prevents situations where users are unable to close modal.
//   maxVisibleSwipeThreshold = Math.min(
//     (deviceHeight - this._visibleOffset) / 2,
//     this.props.swipeThreshold
//   );

//   // init animated values
//   modalOffset = new Animated.Value(deviceHeight);
//   currentPanOffset = new Animated.Value(0);
//   currentModalOffset = Animated.add(this.modalOffset, this.currentPanOffset);

//   // handle user gestures
//   panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderMove: (e, { dy }) => {
//       this.currentPanOffset.setValue(dy);
//     },
//     onPanResponderRelease: (e, { dy }) => {
//       const { _value } = this.currentPanOffset;
//       const { isExpanded, swipeThreshold, isVisible } = this.props;

//       // if (this.props.onSwipeStart) {
//       //   this.props.onSwipeStart();
//       // }

//       if (isExpanded) {
//         if (_value > 0 && Math.abs(_value) > swipeThreshold) {
//           this.props.onSwipeToCollapse();
//         }
//       } else if (isVisible) {
//         if (_value > 0 && Math.abs(_value) > this.maxVisibleSwipeThreshold) {
//           this.props.onSwipeToHide();
//         } else if (_value < 0 && Math.abs(_value) > this.maxVisibleSwipeThreshold)
//           this.props.onSwipeToExpand();
//       }
//       // } else {
//       //   this.props.onSwipeCancel();
//       // }
//       // resets user pan distance with same duration as animation functions
//       this.animatePanOffset(0,);

//       // if (this.props.onSwipeComplete) {
//       //   this.props.onSwipeComplete();
//       // }
//     },
//   });

//   // animation handlers
//   animateModalOffset= (toValue, duration) => {
//     Animated.timing(this.modalOffset, {
//       toValue,
//       duration,
//       useNativeDriver: false,
//     }).start();
//   };

//   animatePanOffset = (toValue, duration) => {
//     Animated.timing(this.currentPanOffset, {
//       toValue,
//       duration,
//       useNativeDriver: false,
//     });
//   }

//   // animation use-cases
//   animateToVisible = () => this.animateModalOffset(
//     this._visibleOffset,
//     this.props.animationDuration
//   );

//   animateToExpanded = () => this.animateModalOffset(
//     this._expandedOffset,
//     this.props.animationDuration,
//   );

//   animateToHidden = () => this.animateModalOffset(
//     deviceHeight,
//     this.props.animationDuration,
//   );


//   componentDidMount() {
//     const { isExpanded, isVisible, scrollToOffset } = this.props;

//     if (isExpanded) {
//       this.animateToExpanded();
//     } else if (isVisible) {
//       this.animateToVisible();
//       // TODO: consider including duration
//     } else if (scrollToOffset) {
//       this.animateModalOffset(scrollToOffset);
//     }
//   }

//   componentDidUpdate(prevProps) {
//     const { isExpanded, isVisible, scrollToOffset } = this.props;

//     if (!prevProps.isExpanded && isExpanded) {
//       this.animateToExpanded();
//     } else if (prevProps.isExpanded && !isExpanded) {
//       this.animateToVisible();
//     } else if (!prevProps.isVisible && isVisible) {
//       this.animateToVisible();
//     } else if (prevProps.isVisible && !isVisible) {
//       this.animateToHidden();
//       // TODO: consider including duration
//     } else if (!prevProps.scrollToOffset && scrollToOffset) {
//       this.animateModalOffset(scrollToOffset);
//     }
//   }

//   render() {
//     return (
//       <Animated.View
//         style={[ styles.modal, { top: this.currentModalOffset }]}
//         { ...this.panResponder.panHandlers }
//       >
//         <View style={ styles.content }>
//           { this.props.children }
//         </View>
//       </Animated.View>
//     )
//   }
// }

// ExpandableModal.propTypes = {
//   animationDuration: PropTypes.number,
//   expandedOffset: PropTypes.number,
//   onSwipeCancel: PropTypes.func,
//   onSwipeComplete: PropTypes.func,
//   onSwipeToCollapse: PropTypes.func.isRequired,
//   onSwipeToHide: PropTypes.func.isRequired,
//   onSwipeToExpand: PropTypes.func.isRequired,
//   scrollToOffset: PropTypes.number,
//   swipeThreshold: PropTypes.number,
//   visibleOffset: PropTypes.number,
// }

// ExpandableModal.defaultProps = {
//   animationDuration: 300,
//   expandedOffset: 0,
//   swipeThreshold: 200,
//   visibleOffset: 0.7,
// }

// const styles = {
//   content: {
//     minHeight: deviceHeight,
//   },
//   hide: {
//     display: 'none',
//   },
//   modal: {
//     backgroundColor: 'white',
//     bottom: 0,
//     padding: 20,
//     position: 'absolute',
//     width: '100%',
//   },
// };


