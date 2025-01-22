import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { doc, setDoc } from "firebase/firestore";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "@/components/map";
import { db } from "@/config/firebase";

const AddPickupLocationScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  if (!location) {
    return <Text>Loading...</Text>;
  }

  const handleAddPickupLocation = async () => {
    try {
      await setDoc(doc(db, "locations", `${location.timestamp}`), {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      Alert.alert("Success", "Pickup location added successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to add pickup location");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <View className="p-4 flex-1">
        <Map location={location} />

        <TouchableOpacity
          onPress={handleAddPickupLocation}
          className="bg-black p-4 rounded-lg mt-4"
        >
          <Text className="text-white text-center font-bold">Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddPickupLocationScreen;
