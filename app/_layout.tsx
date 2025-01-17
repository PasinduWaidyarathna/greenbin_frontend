import { Stack } from "expo-router";

import "./global.css";
import { AuthProvider } from "@/context/auth-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthProvider>
  );
}
