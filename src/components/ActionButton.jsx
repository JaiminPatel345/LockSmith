import {IconButton} from 'react-native-paper';
import {View} from 'react-native';
import React from 'react';

const ActionButton = ({
  iconName,
  mode,
  containerColor,
  iconColor,
  size,
  navigationUri,
  ...otherProps
}) => {
  return (
    <View className="absolute bottom-6 right-6 z-50">
      <IconButton
        icon={iconName}
        mode={mode || 'contained'}
        containerColor={containerColor || colors.primary}
        iconColor={iconColor || '#ffffff'}
        size={size || 35}
        {...otherProps}
      />
    </View>
  );
};

export default ActionButton;
