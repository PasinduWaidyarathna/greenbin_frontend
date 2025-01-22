import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import { auth } from "@/config/firebase";

const HomeScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <View className="bg-green-400 p-4">
        <Text className="text-2xl font-bold text-white">Welcome</Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="absolute top-4 right-4"
        >
          <FontAwesome name="power-off" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="p-4">
          <TouchableOpacity
            onPress={() =>
              router.push("/(admin)/(company)/add-pickup-location")
            }
            className="bg-green-300 rounded-lg p-6 mb-4 flex items-center"
          >
            <FontAwesome name="map-marker" size={32} color="black" />
            <Text className="text-lg font-bold">Add Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(admin)/(company)/change-rates")}
            className="bg-green-300 rounded-lg p-6 mb-4 flex items-center"
          >
            <FontAwesome name="usd" size={32} color="black" />
            <Text className="text-lg font-bold">Change Rates</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
