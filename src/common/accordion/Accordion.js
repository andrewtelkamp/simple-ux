import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

export const Accordion = ({
  children,
  headerStyle,
  isExpanded,
  leftIcon,
  leftIconStyle,
  onHeaderPress,
  onLeftIconPress,
  onRightIconPress,
  rightIconStyle,
  rightIcon,
  title,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={ onHeaderPress }
        style={[ styles.header, headerStyle ]}
      >
        <View style={ styles.titleWrap }>
          { !!leftIcon && (
            <TouchableOpacity onPress={ onHeaderPress || onLeftIconPress }>
              <Image
                source={ leftIcon }
                style={[ styles.icon, styles.leftIcon, leftIconStyle ]}
              />
            </TouchableOpacity>
          )}
          <Text style={ styles.titleStyle }>{ title }</Text>
        </View>

        { !!rightIcon && (
          <TouchableOpacity onPress={ onHeaderPress || onRightIconPress }>
            <Image
              source={ rightIcon }
              style={[ styles.icon, rightIconStyle ]}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      
      { !!isExpanded && children }
    </>
  );
};

const styles = {
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  icon: {
    height: 20,
    width: 20,
  },
  leftIcon: {
    marginRight: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '700'
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
};

// Accordion.propTypes = {
//   children: PropTypes.element,
//   headerStyle: PropTypes.object,
//   isExpanded: PropTypes.bool,
//   leftIcon: PropTypes.string,
//   leftIconStyle: PropTypes.object,
//   onHeaderPress: PropTypes.func.isRequired,
//   onLeftIconPress: PropTypes.func,
//   onRightIconPress: PropTypes.func,
//   rightIconStyle: PropTypes.object,
//   rightIcon: PropTypes.string,
//   title: PropTypes.string.isRequired,
// };

// Accordion.defaultProps = {
//   children
// }