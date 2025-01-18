import { db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const getUserRole = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data().role;
  }
  return null;
};

export const updateUser = async (uid: string, data: any) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { ...data });

  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export const getUser = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
};

export { getUserRole };
