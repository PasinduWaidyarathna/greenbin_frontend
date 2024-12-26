import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const OrderDetailsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <View className="p-4">
        <Text className="text-lg font-bold mb-2">Order Details</Text>
        {[
          "Customer Name",
          "Order ID",
          "Garbage Type",
          "Garbage Quantity (kg)",
        ].map((field) => (
          <TextInput
            key={field}
            className="border border-gray-300 rounded-lg px-4 py-2 mb-2"
            placeholder={`Enter the ${field}`}
          />
        ))}
        <TouchableOpacity className="bg-black p-4 rounded-lg mt-2">
          <Text className="text-white text-center font-bold">Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
