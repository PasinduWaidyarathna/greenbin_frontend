import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { LocationData } from "@/app/(user)/show-pickup-location";

const Map = ({ location, savedLocations }: { location: Location.LocationObject; savedLocations: LocationData[]; }) => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {/* Marker for current location */}
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title="Current Location"
      />
      
      {/* Render saved locations as markers */}
      {savedLocations.map((savedLocation) => (
        <Marker
          key={savedLocation.id}
          coordinate={{
            latitude: savedLocation.latitude,
            longitude: savedLocation.longitude,
          }}
          title={`Saved Location (${savedLocation.id})`}
        />
      ))}
    </MapView>
  );
};

export default Map;
