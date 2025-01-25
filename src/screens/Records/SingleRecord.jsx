import React, {useEffect, useState} from 'react';
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

const CategoryIcon = ({name, size = 24, color}) => (
  <Ionicons name={name} size={size} color={color} />
);

const SingleRecord = ({record}) => {
  const [expanded, setExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const styles = getStyles(theme);

  const getIcon = myIcon => {
    const icons = [
      {title: 'Password', name: 'key-outline'},
      {title: 'ID Number', name: 'card-outline'},
      {title: 'School', name: 'school-outline'},
      {title: 'Others', name: 'ellipsis-horizontal-outline'},
    ];
    return (
      icons.find(i => i.title === myIcon)?.name || 'ellipsis-horizontal-outline'
    );
  };

  const formatPassword = value => {
    return !showPassword ? '•'.repeat(value?.length || 0) : value;
  };

  const handleEdit = () => {};
  const handleDelete = () => {
    dispatch(deleteRecord(record.id));
  };

  return (
    <Card
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
      mode="elevated">
      <Card.Content style={styles.cardContent}>
        <View style={styles.headerContainer}>
          <Surface style={styles.iconContainer} elevation={2}>
            <CategoryIcon
              name={getIcon(record.category)}
              color={theme.colors.primary}
            />
          </Surface>
          <View style={styles.titleContainer}>
            <Text style={styles.title} variant="titleMedium">
              {record.title}
            </Text>
            {record.site && (
              <Text style={styles.site} variant="bodySmall">
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
              titleStyle={styles.listItemTitle}
              descriptionStyle={styles.listItemDescription}
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
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
                left={props => (
                  <List.Icon
                    {...props}
                    icon="note-text-outline"
                    color={theme.colors.secondary}
                  />
                )}
              />
            )}
            <View style={styles.actionContainer}>
              <IconButton
                icon={() => (
                  <Feather
                    name={'edit-2'}
                    color={theme.colors.primary}
                    size={20}
                  />
                )}
                onPress={handleEdit}
                style={styles.actionButton}
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
                style={styles.actionButton}
              />
            </View>
          </List.Section>
        )}
      </Card.Content>
    </Card>
  );
};

const getStyles = theme => ({
  card: {
    marginVertical: 6,
    marginHorizontal: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
  },
  cardContent: {
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  site: {
    color: theme.colors.onSurfaceVariant,
  },
  listItemTitle: {
    color: theme.colors.onSurface,
    fontWeight: '600',
  },
  listItemDescription: {
    color: theme.colors.onSurfaceVariant,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
  actionButton: {
    marginRight: 8,
  },
});

export default SingleRecord;
