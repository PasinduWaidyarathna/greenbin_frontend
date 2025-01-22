import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { db } from "@/config/firebase";

const imageMap: { [key: string]: any } = {
  "/assets/images/items/paper.png": require("@/assets/images/items/paper.png"),
  "/assets/images/items/plastic.png": require("@/assets/images/items/plastic.png"),
  "/assets/images/items/metal.png": require("@/assets/images/items/metal.png"),
  "/assets/images/items/e_waste.png": require("@/assets/images/items/e_waste.png"),
  "/assets/images/items/clothes.png": require("@/assets/images/items/clothes.png"),
  "/assets/images/items/glass.png": require("@/assets/images/items/glass.png"),
};

type ItemTypes = {
  id: number;
  refId: string;
  imagePath: string;
  label: string;
  rate: number;
};

const ChangeRatesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<ItemTypes[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const itemsSnapshot = await getDocs(collection(db, "items"));
    const itemsList = itemsSnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: data.id,
        refId: doc.id,
        imagePath: data.imagePath,
        label: data.label,
        rate: data.rate,
      } as ItemTypes;
    });
    setItems(itemsList);
  };

  const handleSaveRates = async () => {
    try {
      for (const item of items) {
        await updateDoc(doc(db, "items", item.refId), {
          rate: item.rate,
        });
      }

      Alert.alert("Success", "Rates saved successfully");
    } catch (error) {
      console.error(error);

      Alert.alert("Error", "Failed to save rates");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <ScrollView
        className="p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchItems} />
        }
      >
        {items.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center bg-white p-4 mb-2 rounded-lg"
          >
            <View className="flex-row items-center flex-1 gap-6">
              <Image source={imageMap[item.imagePath]} className="w-8 h-8" />
              <Text className="text-base font-medium">{item.label}</Text>
            </View>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-2 text-right"
              keyboardType="numeric"
              value={item.rate.toString()}
              onChangeText={(text) => {
                const updatedRate = parseFloat(text) || 0;
                setItems((prevItems) =>
                  prevItems.map((prevItem) =>
                    prevItem.id === item.id
                      ? { ...prevItem, rate: updatedRate }
                      : prevItem
                  )
                );
              }}
            />
          </View>
        ))}
        <TouchableOpacity
          onPress={handleSaveRates}
          className="bg-black p-4 rounded-lg mt-2"
        >
          <Text className="text-white text-center font-bold">Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeRatesScreen;
