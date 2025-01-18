// import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
// import { Payment } from '../types';
// import { db } from '@/config/firebase';

// export const paymentService = {
//   async createPayment(
//     requestID: string,
//     amount: number,
//     paymentMethod: string
//   ): Promise<string> {
//     try {
//       const paymentData: Omit<Payment, 'paymentID'> = {
//         requestID,
//         amount,
//         paymentMethod,
//         paymentStatus: 'Pending',
//         paymentDateTime: new Date()
//       };

//       const docRef = await addDoc(collection(db, 'payments'), paymentData);
//       return docRef.id;
//     } catch (error) {
//       console.error('Error creating payment:', error);
//       throw error;
//     }
//   },

//   async updatePaymentStatus(
//     paymentID: string,
//     status: Payment['paymentStatus']
//   ): Promise<void> {
//     try {
//       const paymentRef = doc(db, 'payments', paymentID);
//       await updateDoc(paymentRef, { paymentStatus: status });
//     } catch (error) {
//       console.error('Error updating payment status:', error);
//       throw error;
//     }
//   }
// };