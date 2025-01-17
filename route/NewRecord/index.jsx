import React, {useState} from 'react';
import {View, useColorScheme} from 'react-native';
import {
    IconButton,
    TextInput,
    Text,
    MD3Colors,
    Tooltip,
} from 'react-native-paper';

const NewRecord = ({navigation}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [formData, setFormData] = useState({
    key: '',
    value: '',
    notes: '',
    category: 'Others',
  });
  const [isPasswordShow , setIsPasswordShow] = useState(false);

  const icons = [
    {title: 'Password', name: 'key'},
    {title: 'ID Number', name: 'card-account-details'},
    {title: 'License', name: 'car'},
    {title: 'Others', name: 'dots-horizontal'},
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  // Theme-specific colors
  const colors = {
    background: isDarkMode ? '#121212' : '#f5f5f5',
    card: isDarkMode ? '#1e1e1e' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#1a1a1a',
    subText: isDarkMode ? '#a0a0a0' : '#666666',
    border: isDarkMode ? '#333333' : '#e0e0e0',
    primary: MD3Colors.primary40,
  };

  return (
    <View
      className="h-full w-screen p-4"
      style={{backgroundColor: colors.background}}>
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold" style={{color: colors.text}}>
          Add New Record
        </Text>
        <Text className="text-sm mt-1" style={{color: colors.subText}}>
          Securely store your passwords and important numbers
        </Text>
      </View>

      {/* Form Container */}
      <View
        className="rounded-xl p-4"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          shadowColor: colors.text,
          shadowOpacity: isDarkMode ? 0.1 : 0.05,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 8,
          elevation: 3,
        }}>
        {/* Category Selection */}
        <View className={'my-5 flex gap-4  border-white/50'}>
          <View className={'absolute -top-6'}>
            <Text style={{color: colors.text}}>Category's</Text>
          </View>

          <View className=" flex-row flex-wrap gap-2">
            {icons.map(icon => {

              return (
                <Tooltip title={icon.title} key={icon.title}>
                  <IconButton icon={icon.name} size={28} mode={formData.category === icon.title ? 'contained' : 'outlined'}
                  onPress={() => handleChange('category', icon.title)}
                  />
                </Tooltip>
              );
            })}
          </View>
        </View>

        {/* Input Fields */}
        <View className={`flex gap-6`}>
          <TextInput
            label="Username / Id"
            value={formData.key}
            onChangeText={text => handleChange('key', text)}
            mode="outlined"
            theme={{colors: {primary: colors.primary}}}
            textColor={colors.text}
            left={<TextInput.Icon icon="format-title" color={colors.subText} />}
            style={{backgroundColor: colors.card}}
          />

          <TextInput
            label="Value"
            value={formData.value}
            onChangeText={text => handleChange('value', text)}
            mode="outlined"
            secureTextEntry={isPasswordShow}
            theme={{colors: {primary: colors.primary}}}
            textColor={colors.text}
            left={
              <TextInput.Icon
                icon={isPasswordShow ? 'eye-off' : 'eye'}
                color={colors.subText}
                onPress={() => {
                    setIsPasswordShow(!isPasswordShow);
                }}
              />
            }
            style={{backgroundColor: colors.card}}
          />
          <TextInput
            label="Notes (Optional)"
            value={formData.notes}
            onChangeText={text => handleChange('notes', text)}
            mode="outlined"
            multiline
            numberOfLines={3}
            theme={{colors: {primary: colors.primary}}}
            textColor={colors.text}
            left={<TextInput.Icon icon="note-text" color={colors.subText} />}
            style={{backgroundColor: colors.card}}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View className="absolute bottom-6 right-6 flex-row gap-2">
        {/*<IconButton*/}
        {/*  icon="close"*/}
        {/*  mode="outlined"*/}
        {/*  size={35}*/}
        {/*  onPress={() => navigation.goBack()}*/}
        {/*  containerColor={colors.card}*/}
        {/*  iconColor={colors.text}*/}
        {/*  style={{borderColor: colors.border}}*/}
        {/*/>*/}
        <IconButton
          icon="content-save"
          mode="contained"
          containerColor={colors.primary}
          iconColor="#ffffff"
          size={35}
          onPress={() => navigation.navigate('Records')}
        />
      </View>
    </View>
  );
};

export default NewRecord;
