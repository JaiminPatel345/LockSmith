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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CategoryIcon = ({name, size = 24, color}) => (
  <MaterialCommunityIcons name={name} size={size} color={color} />
);

const SingleRecord = ({record}) => {
  const [expanded, setExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  // Derive colors from theme
  const styles = getStyles(theme);

  const getIcon = myIcon => {
    const icons = [
      {title: 'Password', name: 'key'},
      {title: 'ID Number', name: 'card-account-details'},
      {title: 'School', name: 'school'},
      {title: 'Others', name: 'dots-horizontal'},
    ];
    return icons.find(i => i.title === myIcon)?.name || 'dots-horizontal';
  };

  // Function to mask/unmask password
  const formatPassword = value => {
    if (!showPassword) {
      return '•'.repeat(value?.length || 0);
    }
    return value;
  };

  return (
    <Card
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
      mode="outlined">
      <Card.Content style={styles.cardContent}>
        <View style={styles.headerContainer}>
          <Surface style={styles.iconContainer} elevation={2}>
            <CategoryIcon
              name={getIcon(record.category)}
              color={theme.colors.onSurfaceVariant}
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
            iconColor={theme.colors.onSurfaceVariant}
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
                <Switch value={showPassword} onValueChange={setShowPassword} />
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
                    icon="note-text"
                    color={theme.colors.onSurfaceVariant}
                  />
                )}
              />
            )}
          </List.Section>
        )}
      </Card.Content>
    </Card>
  );
};

const getStyles = theme => ({
  card: {
    marginVertical: 4,
    marginHorizontal: 8,
    backgroundColor: theme.colors.surface,
  },
  cardContent: {
    paddingVertical: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  site: {
    color: theme.colors.onSurfaceVariant,
  },
  listItemTitle: {
    color: theme.colors.onSurface,
  },
  listItemDescription: {
    color: theme.colors.onSurfaceVariant,
  },
});

export default SingleRecord;
