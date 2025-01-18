

// import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
// import { PickupLocation } from '../types';
// import { db } from '@/config/firebase';

// export const locationService = {
//   async createLocation(
//     address: string,
//     latitude: number,
//     longitude: number
//   ): Promise<string> {
//     try {
//       const locationData: Omit<PickupLocation, 'locationID'> = {
//         address,
//         latitude,
//         longitude
//       };

//       const docRef = await addDoc(collection(db, 'pickup_locations'), locationData);
//       return docRef.id;
//     } catch (error) {
//       console.error('Error creating location:', error);
//       throw error;
//     }
//   },

//   async getLocation(locationID: string): Promise<PickupLocation | null> {
//     try {
//       const locationRef = doc(db, 'pickup_locations', locationID);
//       const locationDoc = await getDoc(locationRef);
      
//       if (locationDoc.exists()) {
//         return {
//           locationID: locationDoc.id,
//           ...locationDoc.data()
//         } as PickupLocation;
//       }
//       return null;
//     } catch (error) {
//       console.error('Error fetching location:', error);
//       throw error;
//     }
//   }
// };