import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const UserNavigation = ({
    currentScreen,
}: {
    currentScreen: "home" | "requests" | "rewards" | "profile";
}) => {

    const router = useRouter();

    return (
        <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push("/(user)")}
        >
          <MaterialCommunityIcons 
            name="home" 
            size={24} 
            color={currentScreen === "home" ? "#4CAF50" : "#999"} 
          />
          <Text 
            style={[
              styles.navText, 
              { color: currentScreen === "home" ? "#4CAF50" : "#999" }
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
  
        {/* Activities */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push("/(user)/requests")}
        >
          <MaterialCommunityIcons 
            name="format-list-bulleted" 
            size={24} 
            color={currentScreen === "requests" ? "#4CAF50" : "#999"} 
          />
          <Text 
            style={[
              styles.navText, 
              { color: currentScreen === "requests" ? "#4CAF50" : "#999" }
            ]}
          >
            Requests
          </Text>
        </TouchableOpacity>
  
        {/* Rewards */}
        <TouchableOpacity 
          style={styles.navItem} 
        //   onPress={() => router.push("/(user)/")}
        >
          <MaterialCommunityIcons 
            name="trophy-outline" 
            size={24} 
            color={currentScreen === "rewards" ? "#4CAF50" : "#999"} 
          />
          <Text 
            style={[
              styles.navText, 
              { color: currentScreen === "rewards" ? "#4CAF50" : "#999" }
            ]}
          >
            Rewards
          </Text>
        </TouchableOpacity>
  
        {/* Profile */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push("/(user)/profile")}
        >
          <MaterialCommunityIcons 
            name="account" 
            size={24} 
            color={currentScreen === "profile" ? "#4CAF50" : "#999"} 
          />
          <Text 
            style={[
              styles.navText, 
              { color: currentScreen === "profile" ? "#4CAF50" : "#999" }
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    contactButtonText: {
        color: '#000',
        fontWeight: '500',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: '#4CAF50',
    },
    navTextInactive: {
        color: '#999',
    },
});