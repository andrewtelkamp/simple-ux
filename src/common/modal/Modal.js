import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

export default ExpandableModal = ({
  backgroundColor = '#fff',
  children,
  isExpanded = false,
  isVisible = false,
  ...props
}) => {

  let marginTop = '200%';

  if (isExpanded) {
    marginTop = '0%'
  }

  return (
    <Modal
      coverScreen={ false }
      hasBackdrop={ false }
      isVisible={ isVisible }
      style={[ styles.wrap, { marginTop } ]}
      scrollOffset={ 600 }
      scrollOffsetMax={300}
      swipeDirection={ ['up', 'down']}
      { ...props }
    >
      <View style={ styles.modal }>
        { children }
      </View>
    </Modal>
  )
}

const styles = {
  modal: {
    backgroundColor: 'white',
    flex: 1,
  },
  wrap: {
    margin: 0,
  },
}