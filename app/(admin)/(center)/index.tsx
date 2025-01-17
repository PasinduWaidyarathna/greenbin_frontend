import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ScrollView, Button } from "react-native";

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
        <Text className="text-lg font-bold text-white">Welcome</Text>
        <Text className="text-xl font-bold text-white">Lakindu Banneheka</Text>
        <TouchableOpacity className="absolute top-4 right-4">
          <FontAwesome name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="p-4">
          <TouchableOpacity
            onPress={() => router.push("/(admin)/(center)/order-list")}
            className="bg-green-300 rounded-lg p-6 mb-4 flex items-center"
          >
            <FontAwesome name="shopping-bag" size={32} color="black" />
            <Text className="text-lg font-bold">Approve Orders</Text>
          </TouchableOpacity>

          <Button title="Logout" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
