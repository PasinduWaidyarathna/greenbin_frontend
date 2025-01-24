import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { UserNavigation } from "@/components/navigation/user-navigation";
import { useAuth } from "@/context/auth-context";
import { getUser, updateUser } from "@/services/userServices";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

const ProfileScreen = () => {

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const router = useRouter();

  const handleUpdate = () => {
    console.log({ email, username, contactNumber });
    if(user){
      updateUser(user.uid, { email, displayName: username, phoneNumber: contactNumber });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/sign-in");
  }

  useEffect(() => {
    const getUserData = async () => {
      if(user){
        getUser(user.uid).then((userData) => {
          setEmail(userData?.email ?? "");
          setUsername(userData?.displayName ?? "");
          setContactNumber(userData?.phoneNumber ?? "");
        }
      )}
    };
    getUserData();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={40} color="#999" />
          </View>
          <TouchableOpacity style={styles.editButton}>
            <MaterialIcons name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Contact Number"
            placeholderTextColor="#999"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <UserNavigation 
        currentScreen="profile"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: Platform.OS === 'android' ? 56 + (StatusBar.currentHeight || 0) : 56,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: '32%',
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },

  logoutBtn: {
    // backgroundColor: '#b23b3b',
    borderColor: '#b23b3b', 
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutBtnText: {
    color: '#b23b3b',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;