import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/auth-context";

const Page = () => {
  const router = useRouter();
  const { user, role } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      console.log(user, role);

      if (!user) {
        router.push("/sign-in");
      } else if (role === "USER") {
        router.push("/(user)");
      } else if (role === "CENTER") {
        router.push("/(admin)/(center)");
      } else {
        router.push("/(admin)/(company)");
      }
    }
  }, [user, role, hasMounted]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-green-100">
      <StatusBar style="dark" />
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

export default Page;
