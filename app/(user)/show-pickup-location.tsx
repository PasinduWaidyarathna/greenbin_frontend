import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  GeoPoint 
} from "firebase/firestore";
import { 
  Alert, 
  Text, 
  TouchableOpacity, 
  View, 
  FlatList, 
  ScrollView 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import Map from "@/components/map";
import { db } from "@/config/firebase";
import { UserNavigation } from "@/components/navigation/user-navigation";
import Map from "@/components/show-map";

export interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
}

const ShowPickupLocationScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [savedLocations, setSavedLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    fetchSavedLocations();
    getCurrentLocation();
  }, []);

  const fetchSavedLocations = async () => {
    try {
      const locationsCollection = collection(db, "locations");
      const querySnapshot = await getDocs(locationsCollection);
      
      const locations: LocationData[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        latitude: doc.data().latitude,
        longitude: doc.data().longitude
      }));

      setSavedLocations(locations);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch locations");
    }
  };

  const handleAddPickupLocation = async () => {
    if (!location) return;

    try {
      await setDoc(doc(db, "locations", `${location.timestamp}`), {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      Alert.alert("Success", "Pickup location added successfully");
      fetchSavedLocations(); // Refresh locations after adding
    } catch (error) {
      Alert.alert("Error", "Failed to add pickup location");
    }
  };

  if (!location) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />
  
      <View className="p-4 flex-1">
        <Map location={location} savedLocations={savedLocations} />
  
        {/* <TouchableOpacity
          onPress={handleAddPickupLocation}
          className="bg-black p-4 rounded-lg mt-4"
        >
          <Text className="text-white text-center font-bold">Add Current Location</Text>
        </TouchableOpacity> */}
  
        <Text className="text-lg font-bold mt-4 mb-2">Saved Locations:</Text>
        {/* <ScrollView>
          <FlatList
            data={savedLocations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-white p-3 rounded-lg mb-2">
                <Text>Latitude: {item.latitude.toFixed(4)}</Text>
                <Text>Longitude: {item.longitude.toFixed(4)}</Text>
              </View>
            )}
          />
        </ScrollView> */}
      </View>
       <UserNavigation 
          currentScreen="home"
        />
    </SafeAreaView>
  );
  
};

export default ShowPickupLocationScreen;