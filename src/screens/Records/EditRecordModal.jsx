import React, {memo, useState} from 'react';
import {View} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Dialog,
  Portal,
  IconButton,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {updateRecord} from '../../store/thunk';

const EditRecordModal = memo(({record, visible, onDismiss}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: record.id,
    title: record.title || '',
    key: record.key || '',
    site: record.site || '',
    notes: record.notes || '',
    category: record.category || 'Others',
  });

  const icons = [
    {title: 'Password', name: 'key'},
    {title: 'ID Number', name: 'card-account-details'},
    {title: 'School', name: 'school'},
    {title: 'Others', name: 'dots-horizontal'},
  ];

  const handleSave = () => {
    if (formData.title.trim()) {
      dispatch(updateRecord(formData));
      onDismiss();
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Edit Record</Dialog.Title>
        <Dialog.Content>
          <View style={{marginBottom: 10}}>
            <Text>Category</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {icons.map(icon => (
                <IconButton
                  key={icon.title}
                  icon={icon.name}
                  size={28}
                  mode={
                    formData.category === icon.title ? 'contained' : 'outlined'
                  }
                  onPress={() =>
                    setFormData(prev => ({...prev, category: icon.title}))
                  }
                />
              ))}
            </View>
          </View>

          <TextInput
            label="Username / Id"
            value={formData.title}
            onChangeText={text => setFormData(prev => ({...prev, title: text}))}
            mode="outlined"
            style={{marginVertical: 8}}
          />

          <TextInput
            label="Value"
            value={formData.key}
            onChangeText={text => setFormData(prev => ({...prev, key: text}))}
            mode="outlined"
            style={{marginVertical: 8}}
            secureTextEntry
          />

          <TextInput
            label="Site (Optional)"
            value={formData.site}
            onChangeText={text => setFormData(prev => ({...prev, site: text}))}
            mode="outlined"
            style={{marginVertical: 8}}
          />

          <TextInput
            label="Notes (Optional)"
            value={formData.notes}
            onChangeText={text => setFormData(prev => ({...prev, notes: text}))}
            mode="outlined"
            style={{marginVertical: 8}}
            multiline
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default EditRecordModal;
