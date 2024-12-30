import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderListScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="p-4">
          <Text className="text-lg font-bold mb-2">Order List</Text>
          {[1, 2, 3].map((_, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg"
            >
              <FontAwesome name="shopping-bag" size={32} color="black" />
              <View>
                <Text className="text-base">Quantity (kg):</Text>
                <Text className="text-base font-bold text-red-500">
                  LKR 1250.00
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderListScreen;
