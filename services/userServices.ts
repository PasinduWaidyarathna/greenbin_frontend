import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

const getUserRole = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data().role;
  }
  return null;
};

export { getUserRole };
