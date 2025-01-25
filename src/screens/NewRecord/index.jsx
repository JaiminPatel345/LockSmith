import React, {useState} from 'react';
import {ScrollView, useColorScheme, View} from 'react-native';
import {
  IconButton,
  MD3Colors,
  Text,
  TextInput,
  Tooltip,
} from 'react-native-paper';
import ActionButton from '../../components/ActionButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addRecord} from '../../store/thunk';
import {useDispatch} from 'react-redux';

const NewRecord = ({navigation}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [formData, setFormData] = useState({
    title: '',
    key: '',
    notes: '',
    category: 'Others',
  });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const icons = [
    {title: 'Password', name: 'key'},
    {title: 'ID Number', name: 'card-account-details'},
    {title: 'School', name: 'school'},
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
  const dispatch = useDispatch();

  const handleOnSave = () => {
    dispatch(addRecord(formData)).then(() => {
      navigation.navigate('Home');
    });
  };

  return (
    <>
      <ScrollView className=" w-screen p-4 relative ">
        <View>
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
                      <IconButton
                        icon={icon.name}
                        size={28}
                        mode={
                          formData.category === icon.title
                            ? 'contained'
                            : 'outlined'
                        }
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
                value={formData.title}
                onChangeText={text => handleChange('title', text)}
                mode="outlined"
                theme={{colors: {primary: colors.primary}}}
                textColor={colors.text}
                left={
                  <TextInput.Icon icon="format-title" color={colors.subText} />
                }
                style={{backgroundColor: colors.card}}
              />

              <TextInput
                label="Value"
                value={formData.key}
                onChangeText={text => handleChange('key', text)}
                mode="outlined"
                secureTextEntry={isPasswordShow}
                theme={{colors: {primary: colors.primary}}}
                textColor={colors.text}
                right={
                  <TextInput.Icon
                    icon={isPasswordShow ? 'eye-off' : 'eye'}
                    color={colors.subText}
                    onPress={() => {
                      setIsPasswordShow(!isPasswordShow);
                    }}
                  />
                }
                left={
                  <TextInput.Icon
                    icon={() => (
                      <AntDesign
                        name={'key'}
                        size={22}
                        color={colors.subText}
                      />
                    )}
                    color={colors.subText}
                  />
                }
                style={{backgroundColor: colors.card}}
              />
              <TextInput
                label="Site (Optional)"
                value={formData.site}
                onChangeText={text => handleChange('site', text)}
                mode="outlined"
                multiline
                numberOfLines={1}
                theme={{colors: {primary: colors.primary}}}
                textColor={colors.text}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Fontisto
                        name={'world'}
                        size={22}
                        color={colors.subText}
                      />
                    )}
                    color={colors.subText}
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
                left={
                  <TextInput.Icon icon="note-text" color={colors.subText} />
                }
                style={{backgroundColor: colors.card}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Action Buttons */}
      <ActionButton
        iconName={'content-save'}
        mode={'contained'}
        containerColor={colors.primary}
        iconColor="#ffffff"
        size={40}
        onPress={() => handleOnSave()}
      />
    </>
  );
};

export default NewRecord;
