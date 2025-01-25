import React, {memo, useState} from 'react';
import {View} from 'react-native';
import {
  Card,
  IconButton,
  Text,
  Switch,
  Surface,
  List,
  useTheme,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {deleteRecord} from '../../store/thunk';
import {useDispatch} from 'react-redux';
import EditRecordModal from './EditRecordModal';

const CategoryIcon = memo(({name, size = 24, color}) => (
  <Ionicons name={name} size={size} color={color} />
));

const SingleRecord = memo(({record}) => {
  const [expanded, setExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const iconMap = {
    Password: 'key-outline',
    'ID Number': 'card-outline',
    School: 'school-outline',
    Others: 'ellipsis-horizontal-outline',
  };

  const formatPassword = value =>
    showPassword ? value : '•'.repeat(value?.length || 0);

  const handleEdit = () => setIsEditModalVisible(true);
  const handleDelete = () => dispatch(deleteRecord(record.id));
  const handleEditModalDismiss = () => setIsEditModalVisible(false);

  return (
    <>
      <Card
        style={{
          marginVertical: 6,
          marginHorizontal: 10,
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
        }}
        onPress={() => setExpanded(!expanded)}
        mode="elevated">
        <Card.Content style={{paddingVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Surface
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.surfaceVariant,
              }}
              elevation={2}>
              <CategoryIcon
                name={iconMap[record.category] || 'ellipsis-horizontal-outline'}
                color={theme.colors.primary}
              />
            </Surface>

            <View style={{flex: 1, marginLeft: 12}}>
              <Text
                style={{
                  fontWeight: '700',
                  color: theme.colors.onSurface,
                }}
                variant="titleMedium">
                {record.title}
              </Text>
              {record.site && (
                <Text
                  style={{color: theme.colors.onSurfaceVariant}}
                  variant="bodySmall">
                  {record.site}
                </Text>
              )}
            </View>

            <IconButton
              icon={expanded ? 'chevron-up' : 'chevron-down'}
              size={24}
              onPress={() => setExpanded(!expanded)}
              iconColor={theme.colors.primary}
            />
          </View>

          {expanded && (
            <List.Section>
              <List.Item
                title="Password"
                description={formatPassword(record.key)}
                titleStyle={{
                  color: theme.colors.onSurface,
                  fontWeight: '600',
                }}
                descriptionStyle={{
                  color: theme.colors.onSurfaceVariant,
                }}
                right={() => (
                  <Switch
                    value={showPassword}
                    onValueChange={setShowPassword}
                    color={theme.colors.primary}
                  />
                )}
              />

              {record.notes && (
                <List.Item
                  title="Note"
                  description={record.notes}
                  titleStyle={{
                    color: theme.colors.onSurface,
                    fontWeight: '600',
                  }}
                  descriptionStyle={{
                    color: theme.colors.onSurfaceVariant,
                  }}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon="note-text-outline"
                      color={theme.colors.secondary}
                    />
                  )}
                />
              )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingLeft: 8,
                }}>
                <IconButton
                  icon={() => (
                    <Feather
                      name={'edit-2'}
                      color={theme.colors.primary}
                      size={20}
                    />
                  )}
                  onPress={handleEdit}
                  style={{marginRight: 8}}
                />
                <IconButton
                  icon={() => (
                    <Feather
                      name={'trash-2'}
                      color={theme.colors.error}
                      size={20}
                    />
                  )}
                  onPress={handleDelete}
                  style={{marginRight: 8}}
                />
              </View>
            </List.Section>
          )}
        </Card.Content>
      </Card>

      <EditRecordModal
        record={record}
        visible={isEditModalVisible}
        onDismiss={handleEditModalDismiss}
      />
    </>
  );
});

export default SingleRecord;
