import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { db } from "@/config/firebase";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState<DocumentData | null>(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const orderDoc = await getDoc(doc(db, "requests", orderId as string));
    const orderData = orderDoc.data();
    if (orderData) {
      setOrder(orderData);
    }
  };

  const handleApproveOrder = async () => {
    try {
      const orderDoc = doc(db, "requests", orderId as string);
      await updateDoc(orderDoc, { requestStatus: "approved" });

      Alert.alert("Success", "Order approved successfully");
    } catch (error) {
      console.error(error);

      Alert.alert("Error", "Failed to approve order");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <ScrollView className="p-4">
        <Text className="text-lg font-medium mb-2">Customer Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-2"
          placeholder="Enter customer name"
          value={order?.userID}
        />

        <Text className="text-lg font-medium mb-2">Order ID</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-2"
          placeholder="Enter order ID"
          value={orderId as string}
        />

        <Text className="text-lg font-medium mb-2">Garbage Type</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-2"
          placeholder="Enter garbage type"
          value={order?.type}
        />

        <Text className="text-lg font-medium mb-2">Garbage Quantity (kg)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-2"
          placeholder="Enter garbage quantity"
          keyboardType="numeric"
          value={order?.quantity.toString()}
        />

        <Text className="text-lg font-medium mb-2">Total Amount (LKR)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-2"
          placeholder="Enter garbage type"
          value={order?.amount.toString()}
        />

        <TouchableOpacity
          onPress={handleApproveOrder}
          className="bg-black p-4 rounded-lg mt-2"
          disabled={order?.requestStatus === "approved"}
        >
          <Text className="text-white text-center font-bold">
            Approve Order
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
