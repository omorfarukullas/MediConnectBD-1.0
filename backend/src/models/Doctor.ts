interface Doctor {
  id?: number;
  userId: number;
  specialization: string;
  subSpecialization?: string;
  hospital: string;
  bmdcNumber: string;
  experienceYears?: number;
  degrees?: string[];
  languages?: string[];
  education?: Array<{ degree: string; institute: string }>;
  feesOnline?: number;
  feesPhysical?: number;
  available?: boolean;
  isTelemedicineAvailable?: boolean;
  isVerified?: boolean;
  rating?: number;
  reviews?: Array<{ patientName: string; rating: number; comment: string; date: Date }>;
  location?: string;
  status?: 'Active' | 'Inactive' | 'On Leave';
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Doctor };