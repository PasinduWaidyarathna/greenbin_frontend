import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, StatusBar } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { UserNavigation } from "@/components/navigation/user-navigation";
import { requestService } from "@/services/requestService";
import { useAuth } from "@/context/auth-context";
import { recycleItems } from "../data/recycleItems";
import { Request } from "@/services/requestService";

const { width } = Dimensions.get('window');

const RequestCard = ({ type, quantity, price, status }: {
  type: string;
  quantity: number;
  price: number;
  status: string;
}) => {
  const item = recycleItems.find((item) => item.name === type);

  // const icon = recycleItems.find((item) => item.name === type)?.icon as keyof typeof MaterialIcons.glyphMap || "error";
  console.log(type, item?.icon);

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          {type === "Paper" ? (
            <MaterialCommunityIcons name={item?.icon as any} size={40} color="black" />
          ) : (
            <MaterialCommunityIcons name={item?.icon as any} size={40} color="black" />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.typeText}>{type}</Text>
          <Text style={styles.detailText}>Quantity (kg) : {quantity}</Text>
          <Text style={styles.detailText}>Total Sell Price: LKR {price.toFixed(2)}</Text>
          <Text style={[
            styles.statusText,
            { color: status === "Approved" ? "green" : "orange" },
          ]}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

const RequestsScreen = () => {

  const { user } = useAuth();
  const [requests, setRequests] = React.useState<Request[]>([]);

  useEffect(() => {
    // Fetch requests
    const fetchRequests = async () => {
      try {
        if(user?.email) {
          const requests = await requestService.getRequestsByUser(user.email);
          console.log(requests);
          setRequests(requests);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    }

    fetchRequests();
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Requests</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {requests.map((request) => (
          <RequestCard
            key={request.requestID}
            type={request.type}
            quantity={request.quantity}
            price={request.amount}
            status={request.requestStatus}
          />
        ))  
        }
        {/* <RequestCard type="Paper" quantity={5} price={1250} status="Approved" /> */}
        {/* <RequestCard type="Plastic" quantity={5} price={1250} status="Pending" /> */}
      </ScrollView>
      <UserNavigation currentScreen="requests" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: width - 20,
    alignSelf: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  typeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 14,
    marginVertical: 2,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 2,
  },
  linkText: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

export default RequestsScreen;