import React, {memo, useState, useCallback} from 'react';
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {updateRecord} from '../../store/thunk';

const CATEGORIES = [
  {title: 'Password', name: 'key'},
  {title: 'ID Number', name: 'card-account-details'},
  {title: 'School', name: 'school'},
  {title: 'Others', name: 'dots-horizontal'},
];

const EditRecordModal = memo(({record, visible, onDismiss}) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    id: record.id,
    title: record.title || '',
    key: record.key || '',
    site: record.site || '',
    notes: record.notes || '',
    category: record.category || 'Others',
  });

  const handleSave = useCallback(() => {
    if (formData.title.trim()) {
      dispatch(updateRecord(formData));
      onDismiss();
    }
  }, [dispatch, formData, onDismiss]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const styles = getStyles(isDark);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onDismiss}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Record</Text>

          <View style={styles.categoryContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.iconContainer}>
              {CATEGORIES.map(icon => (
                <TouchableOpacity
                  key={icon.title}
                  style={[
                    styles.categoryButton,
                    formData.category === icon.title &&
                      styles.categoryButtonActive,
                  ]}
                  onPress={() =>
                    setFormData(prev => ({
                      ...prev,
                      category: icon.title,
                    }))
                  }>
                  <Icon
                    name={icon.name}
                    size={24}
                    color={
                      formData.category === icon.title
                        ? isDark
                          ? '#FFFFFF'
                          : '#000000'
                        : '#666666'
                    }
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      formData.category === icon.title &&
                        styles.categoryTextActive,
                    ]}>
                    {icon.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username / Id"
              placeholderTextColor={isDark ? '#999999' : '#666666'}
              value={formData.title}
              onChangeText={text =>
                setFormData(prev => ({...prev, title: text}))
              }
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={isDark ? '#999999' : '#666666'}
              value={formData.key}
              onChangeText={text => setFormData(prev => ({...prev, key: text}))}
              secureTextEntry={!showPassword}
              style={[styles.input, {paddingRight: 50}]}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={isDark ? '#FFFFFF' : '#000000'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Site (Optional)"
              placeholderTextColor={isDark ? '#999999' : '#666666'}
              value={formData.site}
              onChangeText={text =>
                setFormData(prev => ({...prev, site: text}))
              }
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Notes (Optional)"
              placeholderTextColor={isDark ? '#999999' : '#666666'}
              value={formData.notes}
              onChangeText={text =>
                setFormData(prev => ({...prev, notes: text}))
              }
              style={[styles.input, styles.multilineInput]}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onDismiss}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}>
              <Text style={[styles.buttonText, styles.saveButtonText]}>
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const getStyles = isDark =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 20,
      color: isDark ? '#FFFFFF' : '#000000',
      textAlign: 'center',
    },
    categoryContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
      color: isDark ? '#FFFFFF' : '#000000',
      fontWeight: '500',
    },
    iconContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    categoryButton: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: isDark ? '#333333' : '#F0F0F0',
      alignItems: 'center',
      minWidth: 80,
    },
    categoryButtonActive: {
      backgroundColor: isDark ? '#007AFF' : '#0066CC',
    },
    categoryText: {
      marginTop: 4,
      fontSize: 12,
      color: '#666666',
    },
    categoryTextActive: {
      color: '#FFFFFF',
    },
    inputContainer: {
      marginBottom: 15,
      position: 'relative',
    },
    input: {
      backgroundColor: isDark ? '#333333' : '#F5F5F5',
      borderRadius: 10,
      padding: 12,
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#000000',
      borderWidth: 1,
      borderColor: isDark ? '#404040' : '#E0E0E0',
    },
    multilineInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    passwordToggle: {
      position: 'absolute',
      right: 12,
      top: 12,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 20,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 10,
      minWidth: 100,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: isDark ? '#333333' : '#F0F0F0',
    },
    saveButton: {
      backgroundColor: '#007AFF',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#000000',
    },
    saveButtonText: {
      color: '#FFFFFF',
    },
  });

export default EditRecordModal;
