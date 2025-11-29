interface Ambulance {
  id?: number;
  driverName: string;
  phone: string;
  plateNumber: string;
  hospitalName?: string;
  type?: 'ICU' | 'AC' | 'Non-AC' | 'Freezer';
  status?: 'Active' | 'Busy' | 'On the Way';
  locationLat?: number;
  locationLon?: number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Ambulance };