interface Appointment {
  id?: number;
  patientId: number;
  doctorId: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Telemedicine';
  status?: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Missed';
  queueNumber?: number;
  symptoms?: string;
  paymentStatus?: 'Paid' | 'Unpaid';
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Appointment };