import { useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { View, TextInput, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth } from "@/config/firebase";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-green-100">
      <StatusBar style="dark" />

      <View>
        <Text>Sign In</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Sign In" onPress={handleSignIn} />
        <Text>
          Don't have an account?{" "}
          <Text onPress={() => router.push("/sign-up")}>Sign Up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
