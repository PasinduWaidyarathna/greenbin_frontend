import { db } from "@/config/firebase";

import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

export interface Request {
  requestID: string;
  userID: string;
  locationID: string;
  requestStatus: string;
  requestedDateTime: Date;
  amount: number;
  pickupDateTime: Date | null;
  quantity: number;
  bank: string;
  accountNumber: string;
  beneficiaryName: string;
  type: string;
}

export const requestService = {
    async createRequest(
      userID: string,
      locationID: string,
      quantity: number,
      amount: number,
      bank: string,
      accountNumber: string,
      beneficiaryName: string,
      type: string
    ): Promise<string> {
      try {
        const requestData: Omit<Request, 'requestID'> = {
          userID,
          locationID,
          requestStatus: 'Pending',
          requestedDateTime: new Date(),
          amount,
          pickupDateTime: null,
          quantity,
          bank,
          accountNumber,
          beneficiaryName,
          type
        };
  
        const docRef = await addDoc(collection(db, 'requests'), requestData);
        return docRef.id;
      } catch (error) {
        console.error('Error creating request:', error);
        throw error;
      }
    },
  
    async updateRequestStatus(
      requestID: string,
      status: Request['requestStatus']
    ): Promise<void> {
      try {
        const requestRef = doc(db, 'requests', requestID);
        await updateDoc(requestRef, { requestStatus: status });
      } catch (error) {
        console.error('Error updating request status:', error);
        throw error;
      }
    },
  
    async getRequestsByUser(userID: string): Promise<Request[]> {
      try {
        const q = query(collection(db, 'requests'), where('userID', '==', userID));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            requestID: doc.id,
            userID: data.userID,
            locationID: data.locationID,
            requestStatus: data.requestStatus,
            requestedDateTime: data.requestedDateTime.toDate(),
            amount: data.amount,
            pickupDateTime: data.pickupDateTime ? data.pickupDateTime.toDate() : null,
            quantity: data.quantity,
            type: data.type,
          } as Request;
        });
      } catch (error) {
        console.error('Error fetching user requests:', error);
        throw error;
      }
    }
};
  