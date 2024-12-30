import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useState } from "react";
import { View } from "react-native";
import * as Location from "expo-location";

const Map = ({ location }: { location: Location.LocationObject }) => {
  const [markerPosition, setMarkerPosition] = useState({
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
  });

  const handlePress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
  };

  return (
    <View className="flex-1">
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        initialRegion={{
          latitude: markerPosition.latitude,
          longitude: markerPosition.longitude,
          latitudeDelta: 0.036,
          longitudeDelta: 0.036,
        }}
        onPress={handlePress}
      >
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            title="Selected Location"
            description={`Lat: ${markerPosition.latitude}, Lon: ${markerPosition.longitude}`}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
