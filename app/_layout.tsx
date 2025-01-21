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
      >
        <Stack.Screen
          name="(admin)/(company)/add-pickup-location"
          options={{
            headerShown: true,
            headerTitle: "Add a New Pickup Location",
          }}
        />
        <Stack.Screen
          name="(admin)/(company)/change-rates"
          options={{
            headerShown: true,
            headerTitle: "Change Rates",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
