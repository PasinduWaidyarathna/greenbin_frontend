// User table type
export type User = {
    userID: string; // Primary Key
    username: string;
    password: string;
    role: 'User' | 'Admin' | 'Collector';
    contactNumber: string;
    email: string;
  };
  
  // Pickup_Locations table type
  export type PickupLocation = {
    locationID: string; // Primary Key
    address: string;
    latitude: number;
    longitude: number;
  };
  
  // Requests table type
  export type Request = {
    requestID: string; // Primary Key
    userID: string; // Foreign Key referencing Users table
    itemType: string;
    locationID: string; // Foreign Key referencing Pickup_Locations table
    requestStatus: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
    requestedDateTime: Date;
    amount: number;
    pickupDateTime: Date | null; // Nullable if not scheduled yet
    quantity: number; // Quantity of garbage
    type: string; // Type of garbage
    
    bank: string;
    accountNumber: string;
    beneficiaryName: string;
  };
  
  // Payment table type
  export type Payment = {
    paymentID: string; // Primary Key
    requestID: string; // Foreign Key referencing Requests table
    amount: number;
    paymentMethod: string; // Can be further constrained, e.g., 'Card' | 'Cash' | 'Online'
    paymentStatus: 'Pending' | 'Paid' | 'Refunded';
    paymentDateTime: Date;
  };
  