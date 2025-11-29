
import { Doctor, Hospital, Ambulance, UserRole, Appointment, AppointmentStatus, Prescription, MedicalReport, Vitals, Department, Transaction } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Omor Faruck Ullas',
    role: UserRole.DOCTOR,
    email: 'omor@mediconnect.bd',
    specialization: 'Cardiology',
    subSpecialization: 'Interventional Cardiology',
    hospital: 'Square Hospital',
    bmdcNumber: 'A-12345',
    experienceYears: 12,
    education: [
        { degree: 'MBBS', institute: 'Dhaka Medical College' },
        { degree: 'FCPS (Cardiology)', institute: 'BCPS' },
        { degree: 'MD (Cardiology)', institute: 'BSMMU' }
    ],
    languages: ['English', 'Bengali'],
    fees: { online: 1000, physical: 1500 },
    available: true,
    nextSlot: '10:30 AM',
    rating: 4.8,
    reviews: [
        { id: 'r1', patientName: 'Rahim U.', rating: 5, comment: 'Very professional and calm behavior.', date: '2 days ago' },
        { id: 'r2', patientName: 'Karim A.', rating: 4.5, comment: 'Wait time was a bit long but treatment was good.', date: '1 week ago' }
    ],
    patientsInQueue: 12,
    isTelemedicineAvailable: true,
    isVerified: true,
    degrees: ['MBBS', 'FCPS', 'MD'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    location: 'Panthapath, Dhaka',
    status: 'Active'
  },
  {
    id: 'd2',
    name: 'Dr. Sheikh Abdullah Al Mehedi',
    role: UserRole.DOCTOR,
    email: 'mehedi@mediconnect.bd',
    specialization: 'General Medicine',
    hospital: 'Dhaka Medical College',
    bmdcNumber: 'A-67890',
    experienceYears: 8,
    education: [
        { degree: 'MBBS', institute: 'Chittagong Medical College' },
        { degree: 'BCS (Health)', institute: 'Govt. of Bangladesh' }
    ],
    languages: ['Bengali', 'English', 'Hindi'],
    fees: { online: 500, physical: 800 },
    available: true,
    nextSlot: '11:00 AM',
    rating: 4.5,
    reviews: [
        { id: 'r3', patientName: 'Saima K.', rating: 5, comment: 'Listened to my problems very carefully.', date: '3 days ago' }
    ],
    patientsInQueue: 25,
    isTelemedicineAvailable: true,
    isVerified: true,
    degrees: ['MBBS', 'BCS (Health)'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300',
    location: 'Bakshibazar, Dhaka',
    status: 'Active'
  },
  {
    id: 'd3',
    name: 'Dr. Rayan Rahman',
    role: UserRole.DOCTOR,
    email: 'rayan@mediconnect.bd',
    specialization: 'Neurology',
    hospital: 'United Hospital',
    bmdcNumber: 'A-11223',
    experienceYears: 15,
    education: [
        { degree: 'MBBS', institute: 'Sir Salimullah Medical College' },
        { degree: 'PhD (Neuroscience)', institute: 'University of Tokyo' },
        { degree: 'FRCP', institute: 'Royal College, UK' }
    ],
    languages: ['English', 'Bengali', 'Japanese'],
    fees: { online: 2000, physical: 2500 },
    available: false,
    nextSlot: 'Tomorrow 4:00 PM',
    rating: 4.9,
    reviews: [],
    patientsInQueue: 0,
    isTelemedicineAvailable: false,
    isVerified: true,
    degrees: ['MBBS', 'PhD', 'FRCP'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
    location: 'Gulshan 2, Dhaka',
    status: 'On Leave'
  },
  {
    id: 'd4',
    name: 'Dr. Saiful Islam',
    role: UserRole.DOCTOR,
    email: 'saiful@mediconnect.bd',
    specialization: 'Orthopedics',
    hospital: 'Evercare Hospital',
    bmdcNumber: 'A-55443',
    experienceYears: 10,
    education: [
        { degree: 'MBBS', institute: 'Rajshahi Medical College' },
        { degree: 'MS (Ortho)', institute: 'NITOR' }
    ],
    languages: ['English', 'Bengali'],
    fees: { online: 1200, physical: 1800 },
    available: true,
    nextSlot: '12:15 PM',
    rating: 4.7,
    reviews: [
         { id: 'r4', patientName: 'Anon', rating: 4, comment: 'Good doctor but hospital is expensive.', date: '1 month ago' }
    ],
    patientsInQueue: 8,
    isTelemedicineAvailable: true,
    isVerified: true,
    degrees: ['MBBS', 'MS (Ortho)'],
    image: 'https://images.unsplash.com/photo-1612531386530-97286d74c2ea?auto=format&fit=crop&q=80&w=300&h=300',
    location: 'Bashundhara R/A, Dhaka',
    status: 'Active'
  }
];

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'Square Hospital',
    address: '18/F, Bir Uttam Qazi Nuruzzaman Sarak, Dhaka',
    icuAvailable: 2,
    generalBedsAvailable: 15,
    type: 'Private',
    contact: '10616',
    coordinates: { lat: 23.7531, lng: 90.3769 }
  },
  {
    id: 'h2',
    name: 'Dhaka Medical College',
    address: 'Secretariat Rd, Dhaka',
    icuAvailable: 0,
    generalBedsAvailable: 5,
    type: 'Public',
    contact: '02-55165088',
    coordinates: { lat: 23.7259, lng: 90.3973 }
  },
  {
    id: 'h3',
    name: 'United Hospital',
    address: 'Plot 15, Rd No 71, Dhaka',
    icuAvailable: 5,
    generalBedsAvailable: 42,
    type: 'Private',
    contact: '10666',
    coordinates: { lat: 23.7995, lng: 90.4225 }
  }
];

export const MOCK_AMBULANCES: Ambulance[] = [
  { 
      id: 'a1', 
      driverName: 'Rafiqul Islam', 
      phone: '01700000001', 
      location: 'Dhanmondi 27', 
      status: 'Active', 
      distance: '1.2 km', 
      distanceValue: 1.2,
      hospitalName: 'Square Hospital', 
      plateNumber: 'DHA-METRO-KA-1122',
      type: 'ICU',
      rating: 4.8,
      estimatedTime: '5-8 mins'
  },
  { 
      id: 'a2', 
      driverName: 'Abdul Karim', 
      phone: '01700000002', 
      location: 'Mohammadpur', 
      status: 'Busy', 
      distance: '3.5 km', 
      distanceValue: 3.5,
      hospitalName: 'City Hospital', 
      plateNumber: 'DHA-METRO-KA-3344',
      type: 'AC',
      rating: 4.5,
      estimatedTime: '12-15 mins'
  },
  { 
      id: 'a3', 
      driverName: 'Kamal Hossain', 
      phone: '01700000003', 
      location: 'Farmgate', 
      status: 'Active', 
      distance: '2.0 km', 
      distanceValue: 2.0,
      hospitalName: 'Dhaka Medical', 
      plateNumber: 'DHA-METRO-KA-5566',
      type: 'Non-AC',
      rating: 4.2,
      estimatedTime: '8-10 mins'
  },
  { 
      id: 'a4', 
      driverName: 'Suman Ahmed', 
      phone: '01700000004', 
      location: 'Uttara Sector 7', 
      status: 'On the Way', 
      distance: '12.0 km', 
      distanceValue: 12.0,
      hospitalName: 'Crescent Hospital', 
      plateNumber: 'DHA-METRO-HA-9988',
      type: 'Freezer',
      rating: 4.9,
      estimatedTime: '30 mins'
  },
  { 
      id: 'a5', 
      driverName: 'Bilal Miah', 
      phone: '01700000005', 
      location: 'Panthapath', 
      status: 'Active', 
      distance: '0.8 km', 
      distanceValue: 0.8,
      hospitalName: 'Samorita Hospital', 
      plateNumber: 'DHA-METRO-CHA-7721',
      type: 'AC',
      rating: 4.7,
      estimatedTime: '3-5 mins'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt1',
    patientName: 'Rahim Uddin',
    doctorName: 'Dr. Omor Faruck Ullas',
    date: '2023-10-27',
    time: '10:30 AM',
    type: 'In-Person',
    status: AppointmentStatus.CONFIRMED,
    queueNumber: 15,
    symptoms: 'Chest pain and mild fever'
  },
  {
    id: 'apt2',
    patientName: 'Karim Ahmed',
    doctorName: 'Dr. Omor Faruck Ullas',
    date: '2023-10-27',
    time: '11:00 AM',
    type: 'Telemedicine',
    status: AppointmentStatus.PENDING,
    symptoms: 'Follow up for hypertension'
  }
];

export const MOCK_VITALS: Vitals = {
  bloodGroup: 'B+',
  height: '5\' 8"',
  weight: '75 kg',
  bloodPressure: '120/80',
  heartRate: '72 bpm',
  allergies: ['Penicillin', 'Dust'],
  conditions: ['Mild Hypertension', 'Seasonal Asthma']
};

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx1',
    doctorName: 'Dr. Omor Faruck Ullas',
    date: '2023-09-15',
    diagnosis: 'Viral Fever',
    medicines: [
      { name: 'Napa Extend', dosage: '665mg', duration: '5 days', instruction: '1+0+1 after meal' },
      { name: 'Monas 10', dosage: '10mg', duration: '10 days', instruction: '0+0+1 at night' }
    ]
  },
  {
    id: 'rx2',
    doctorName: 'Dr. Sheikh Abdullah Al Mehedi',
    date: '2023-06-10',
    diagnosis: 'Gastritis',
    medicines: [
      { name: 'Seclo 20', dosage: '20mg', duration: '14 days', instruction: '1+0+1 before meal' }
    ]
  }
];

export const MOCK_REPORTS: MedicalReport[] = [
  { id: 'rpt1', testName: 'CBC (Complete Blood Count)', hospitalName: 'Popular Diagnostic', date: '2023-09-14', status: 'Ready', fileUrl: '#' },
  { id: 'rpt2', testName: 'Chest X-Ray', hospitalName: 'Square Hospital', date: '2023-09-14', status: 'Ready', fileUrl: '#' },
  { id: 'rpt3', testName: 'Lipid Profile', hospitalName: 'United Hospital', date: '2023-10-26', status: 'Pending' },
];

export const MOCK_DEPARTMENTS: Department[] = [
    {
        id: 'dep1',
        name: 'Cardiology',
        headDoctor: 'Dr. Omor Faruck Ullas',
        services: [
            { id: 's1', name: 'ECG', price: 500, available: true },
            { id: 's2', name: 'Echocardiogram', price: 2500, available: true }
        ]
    },
    {
        id: 'dep2',
        name: 'Orthopedics',
        headDoctor: 'Dr. Saiful Islam',
        services: [
            { id: 's3', name: 'X-Ray (Limb)', price: 600, available: true },
            { id: 's4', name: 'Bone Density Scan', price: 3000, available: true }
        ]
    }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'tx1', date: '2023-10-26', source: 'Appointment - Rahim U.', amount: 1500, type: 'Income', status: 'Completed' },
    { id: 'tx2', date: '2023-10-26', source: 'Service - ECG', amount: 500, type: 'Income', status: 'Completed' },
    { id: 'tx3', date: '2023-10-25', source: 'Platform Commission', amount: 200, type: 'Commission', status: 'Completed' },
    { id: 'tx4', date: '2023-10-24', source: 'Equipment Maintenance', amount: 15000, type: 'Expense', status: 'Completed' }
];

export const SYMPTOM_PROMPT_PREFIX = `
You are an expert medical assistant for MediConnect BD.
Based on the user's symptoms described below, suggest:
1. Which specialist doctor they should see.
2. The urgency level (Low/Medium/Emergency).
3. A brief, reassuring explanation.

Respond in JSON format with keys: specialist (string), urgency (string), advice (string).
Do not provide medical prescriptions.

User Symptoms: 
`;
