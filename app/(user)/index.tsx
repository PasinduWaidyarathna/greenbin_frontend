import { signOut } from "firebase/auth";
import { Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth } from "@/config/firebase";

const HomeScreen = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default HomeScreen;
