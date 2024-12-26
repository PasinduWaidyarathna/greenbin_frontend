import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPickupLocationScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <View className="p-4">
        <Text className="text-lg font-bold mb-2">
          Add a New Pickup Location
        </Text>
        <View className="flex-1 bg-gray-100 rounded-lg justify-center items-center">
          <FontAwesome name="map-marker" size={48} color="red" />
        </View>
        <TouchableOpacity className="bg-black p-4 rounded-lg mt-4">
          <Text className="text-white text-center font-bold">Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddPickupLocationScreen;
