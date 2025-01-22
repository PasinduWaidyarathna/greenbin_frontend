import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";

import { db } from "@/config/firebase";

const OrderListScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState<DocumentData[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const itemsSnapshot = await getDocs(collection(db, "requests"));

    const ordersList = itemsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(ordersList);
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />
        }
      >
        <View className="p-4">
          {orders.map((order, index) => (
            <Link
              key={order.id}
              href={{
                pathname: "/(admin)/(center)/order/[orderId]",
                params: { orderId: order.id },
              }}
              className="flex-row justify-between items-center bg-white p-6 mb-2 rounded-lg"
            >
              <Image
                source={require("@/assets/images/items/bag.png")}
                className="w-12 h-12"
              />

              <View>
                <Text>
                  Order Status:{" "}
                  <Text
                    className={`
                ${
                  order.requestStatus === "approved"
                    ? "text-green-500"
                    : "text-yellow-500"
                }
                `}
                  >
                    {order.requestStatus}
                  </Text>
                </Text>

                <Text>Quantity (kg): {order.quantity}</Text>
                <Text className="text-base font-bold text-red-500">
                  LKR {order.amount}
                </Text>
              </View>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderListScreen;
