import { auth } from '@/config/firebase';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

interface SignInScreenProps {
  onSignIn: (username: string, password: string) => void;
  onJoinNow: () => void;
}

export default function SignInScreen({ }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  // const handleSignIn = () => {
  //   onSignIn(username, password);
  // };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          {/* <Image source={require('../assets/')} /> */}
          <Text style={styles.logoText}>
            <Text style={styles.greenText}>SMART </Text>
            <Text style={styles.blackText}>BIN</Text>
            {/* You would typically use an Image component here for the bag icon */}
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.joinNowContainer}>
            <Text style={styles.joinNowText}>Not a member yet? </Text>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text style={styles.joinNowLink}>Join Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  greenText: {
    color: '#4CAF50',
  },
  blackText: {
    color: '#000',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinNowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  joinNowText: {
    color: '#000',
    fontSize: 14,
  },
  joinNowLink: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
});