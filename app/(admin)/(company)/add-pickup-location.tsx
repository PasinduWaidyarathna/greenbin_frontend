import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "@/components/map";

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

  const handleAddPickupLocation = () => {
    // Add pickup location to database
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <View className="p-4 h flex-1">
        <Text className="text-lg font-bold mb-2">
          Add a New Pickup Location
        </Text>

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
