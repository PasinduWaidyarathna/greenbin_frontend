import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const ChangeRatesScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <View className="p-4">
        <Text className="text-lg font-bold mb-2">Change Rates</Text>
        {["Paper", "Plastic", "Metal", "E-Waste", "Clothes", "Glass"].map(
          (item) => (
            <View
              key={item}
              className="flex-row items-center justify-between bg-gray-100 p-4 mb-2 rounded-lg"
            >
              <Text className="text-base font-medium">{item}</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-2 text-right"
                keyboardType="numeric"
                placeholder="60.00"
              />
            </View>
          )
        )}
        <TouchableOpacity className="bg-black p-4 rounded-lg mt-2">
          <Text className="text-white text-center font-bold">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangeRatesScreen;
