
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  GUEST = 'GUEST' // For emergency view without login
}

export enum AppointmentStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  MISSED = 'Missed'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  hospitalId?: string; // Links an ADMIN to a specific hospital
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Doctor extends User {
  specialization: string;
  subSpecialization?: string;
  hospital: string;
  
  // Professional Details
  bmdcNumber: string;
  experienceYears: number;
  degrees: string[];
  education: { degree: string; institute: string }[];
  languages: string[];
  
  // Consultation & Fees
  fees: {
      online: number;
      physical: number;
  };
  available: boolean;
  nextSlot: string;
  
  // Stats & System
  rating: number;
  reviews: Review[];
  patientsInQueue: number;
  isTelemedicineAvailable: boolean;
  isVerified: boolean; // BMDC Verified
  
  // Media
  image: string;
  location: string;
  coordinates?: { lat: number, lng: number };
  
  // Admin Control
  status?: 'Active' | 'Inactive' | 'On Leave';
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  icuAvailable: number;
  generalBedsAvailable: number;
  type: 'Public' | 'Private';
  contact: string;
  coordinates: { lat: number, lng: number };
}

export interface Department {
    id: string;
    name: string;
    headDoctor: string;
    services: Service[];
}

export interface Service {
    id: string;
    name: string;
    price: number;
    available: boolean;
}

export interface Transaction {
    id: string;
    date: string;
    source: string; // Patient Name or Service
    amount: number;
    type: 'Income' | 'Expense' | 'Commission';
    status: 'Completed' | 'Pending';
}

export interface Ambulance {
  id: string;
  driverName: string;
  phone: string;
  location: string;
  status: 'Active' | 'Busy' | 'On the Way';
  distance: string; // Display string e.g. "1.2 km"
  distanceValue: number; // Numeric distance for filtering
  hospitalName?: string;
  plateNumber?: string;
  type: 'ICU' | 'AC' | 'Non-AC' | 'Freezer';
  rating: number;
  estimatedTime: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Telemedicine';
  status: AppointmentStatus;
  queueNumber?: number;
  symptoms?: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    duration: string;
    instruction: string;
  }[];
}

export interface MedicalReport {
  id: string;
  testName: string;
  hospitalName: string;
  date: string;
  status: 'Ready' | 'Pending';
  fileUrl?: string;
}

export interface Vitals {
  bloodGroup: string;
  height: string;
  weight: string;
  bloodPressure: string;
  heartRate: string;
  allergies: string[];
  conditions: string[];
}
