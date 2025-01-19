import {Text, View} from 'react-native';

const SingleRecord = ({record}) => {
    // Since it's coming from FlatList, record is actually in record.item


    return(
        <View className="bg-amber-300 p-4 m-2 rounded-lg">
            <Text className="text-rose-500 font-bold text-base">ID: {record.id}</Text>
            <Text className="text-rose-500 font-bold text-base">Title: {record.title}</Text>
            <Text className="text-rose-500 font-bold text-base">Value: {record.value}</Text>
            <Text className="text-rose-500 font-bold text-base">Note: {record.note}</Text>
            <Text className="text-rose-500 font-bold text-base">Site: {record.site}</Text>
        </View>
    )
}

export default SingleRecord;
