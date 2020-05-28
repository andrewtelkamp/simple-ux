import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  PanResponder,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

const deviceHeight = Dimensions.get('window').height


export class ExpandableModal extends Component {
  state = {
    modalHeight: 0,
  }

  // Calculate offset values by device height. Used in PanResponder and animations
  _expandedOffset = this.props.expandedOffset * deviceHeight
  _visibleOffset = this.props.visibleOffset * deviceHeight
  
  // Requiring threshold be be less than half of it's height.
  // Prevents situations where users are unable to close modal.
  maxVisibleSwipeThreshold = Math.min(
    (deviceHeight - this._visibleOffset) / 2,
    this.props.swipeThreshold
  )

  // Init animated values
  modalOffset = new Animated.Value(deviceHeight)
  currentPanOffset = new Animated.Value(0)
  currentModalOffset = Animated.add(this.modalOffset, this.currentPanOffset)

  // TODO: See if we can get and set the modal height. We can use it
  // to make the modal "sticky" when a user has panned all the way to
  // to the bottom
  setModalHeight = event => {
    const { height } = event.nativeEvent.layout
    this.setState({ modalHeight: height })
  }

  // Handle user gestures/panning
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderStart: (e, gs) => {
      // Props hook
      if (this.props.onSwipeStart) {
        this.props.onSwipeStart(e, gs)
      }
    },

    onPanResponderMove: (e, gs) => {
      // Update offset of the modal to include y change
      // from user pan. Get's jumpy if throttled
      this.currentPanOffset.setValue(gs.dy)

      // Props hook. Should likely should be throttled
      if (this.props.onSwipe) {
        this.props.onSwipe(e, gs)
      }
    },

    onPanResponderRelease: (e, gs) => {
      const { _value } = this.currentPanOffset
      const { isExpanded, swipeThreshold, isVisible } = this.props

      if (isExpanded) {
        const distanceBelowTop = this.modalOffset._value + gs.dy
        
        // Modal above the top fold. Overriding modal offset to
        // maintain "above the fold" positioning for next click
        if (distanceBelowTop < this._expandedOffset) {
          this.modalOffset.setValue(this.currentPanOffset._value += this.modalOffset._value)
          this.currentPanOffset.setValue(0)
        
          // User has scrolled far enough to collapse the modal
        } else if (distanceBelowTop > swipeThreshold) {
          this.props.onSwipeToCollapse(e, gs)
          this.resetUserPan(this.props.collapseAnimationDuration)
        
        // User hasn't scrolled far enough to trigger a collapse,
        // yet is below the fold. Animate back to top
        } else {
          this.animateToExpanded()
          this.resetUserPan()
        }
      } else if (isVisible) {
        
        // User swiping to close modal
        if (_value > 0 && Math.abs(_value) > this.maxVisibleSwipeThreshold) {
          this.props.onSwipeToHide(e, gs)
          this.resetUserPan(this.props.hideAnimationDuration)
        
          // User swiping to expand modal
        } else if (_value < 0 && Math.abs(_value) > this.maxVisibleSwipeThreshold) {
          this.props.onSwipeToExpand(e, gs)
          this.resetUserPan(this.props.expandAnimationDuration)
        } else {
          this.resetUserPan()
        }
      }
      
      // Props hook
      if (this.props.onSwipeCancel) {
        this.props.onSwipeCancel(e, gs)
      }
    },
  })


  // Modal animations
  animateModalOffset = (toValue, time, cb) => {
    Animated.timing(this.modalOffset, {
      toValue,
      duration: time || this.props.defaultAnimationDuration,
      useNativeDriver: false,
    }).start(cb)
  }

  animateToVisible = () => this.animateModalOffset(
    this._visibleOffset,
    this.props.showAnimationDuration,
    this.props.onShowModalComplete,
  )

  animateToCollapsed = () => this.animateModalOffset(
    this._visibleOffset,
    this.props.collapseAnimationDuration,
    this.props.onCollapseModalComplete,
  )

  animateToExpanded = () => this.animateModalOffset(
    this._expandedOffset,
    this.props.expandAnimationDuration,
    this.props.onExpandModalComplete,
  )

  animateToHidden = () => this.animateModalOffset(
    deviceHeight,
    this.props.hideAnimationDuration,
    this.props.onHideModalComplete,
  )


  // User-pan animations
  animatePanOffset = (toValue, time, cb) => {
    Animated.timing(this.currentPanOffset, {
      toValue,
      duration: time || this.props.defaultAnimationDuration,
      useNativeDriver: false,
    }).start(cb)
  }

  resetUserPan = time => this.animatePanOffset(0, time)


  // Lifecycles
  componentDidUpdate(prevProps) {
    const { isExpanded, isVisible } = this.props

    if (!prevProps.isExpanded && isExpanded) {
      this.animateToExpanded()
    } else if (prevProps.isExpanded && !isExpanded) {
      this.animateToCollapsed()
    } else if (!prevProps.isVisible && isVisible) {
      this.animateToVisible()
    } else if (prevProps.isVisible && !isVisible) {
      this.animateToHidden()
    }
  }

  render() {
    return (
      <Animated.View
        onLayout={ this.setModalHeight }
        style={[ styles.modal, { top: this.currentModalOffset }]}
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
}

ExpandableModal.defaultProps = {
  defaultAnimationDuration: 300,
  expandedOffset: 0,
  swipeThreshold: 200,
  visibleOffset: 0.7,
}

const styles = {
  content: {
    flex: 1,
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
}
