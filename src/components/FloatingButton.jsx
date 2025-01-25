import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const AnimatedFloatingButton = ({
  containerColor = '#007bff',
  iconColor = '#ffffff',
}) => {
  const [isExtended, setIsExtended] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const toggleExtended = () => {
    Animated.timing(animatedValue, {
      toValue: isExtended ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsExtended(!isExtended);
  };

  const handleNewRecord = () => {
    navigation.navigate('NewRecord');
    toggleExtended();
  };

  const handleDeleteAll = () => {
    //TODO: delete all
    toggleExtended();
  };

  const rotateInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const actionButtonsOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      {isExtended && (
        <View style={styles.actionButtonsContainer}>
          <Animated.View style={{opacity: actionButtonsOpacity}}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleNewRecord}>
              <IconButton
                icon="plus-circle"
                iconColor={iconColor}
                containerColor={containerColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDeleteAll}>
              <IconButton
                icon="trash-can"
                iconColor={iconColor}
                containerColor={containerColor}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      <Animated.View
        style={[
          styles.mainButton,
          {
            transform: [{rotate: rotateInterpolation}],
            width: 60,
            height: 60,
            borderRadius: 15,
          },
        ]}>
        <TouchableOpacity onPress={toggleExtended}>
          <IconButton
            icon={isExtended ? 'close' : 'plus'}
            mode="contained"
            containerColor={containerColor}
            iconColor={iconColor}
            size={40}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 50,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    alignItems: 'flex-end',
  },
  actionButton: {
    marginBottom: 10,
  },
  mainButton: {
    zIndex: 100,
  },
});

export default AnimatedFloatingButton;
