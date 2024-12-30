import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <Link href="/(admin)/(center)">Center</Link>
      <Link href="/(admin)/(company)">Company</Link>
    </SafeAreaView>
  );
};

export default HomeScreen;
