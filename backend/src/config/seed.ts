import connectDB from './db';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  const pool = await connectDB();

  try {
    console.log('Starting seed data population...');

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insert test users
    const users = [
      { name: 'Admin User', email: 'admin@mediconnect.com', password: hashedPassword, phone: '01700000001', role: 'ADMIN' },
      { name: 'Dr. Ahmed Khan', email: 'ahmed@mediconnect.com', password: hashedPassword, phone: '01700000002', role: 'DOCTOR' },
      { name: 'Dr. Fatima Begum', email: 'fatima@mediconnect.com', password: hashedPassword, phone: '01700000003', role: 'DOCTOR' },
      { name: 'John Patient', email: 'john@patient.com', password: hashedPassword, phone: '01700000004', role: 'PATIENT' },
      { name: 'Sarah Patient', email: 'sarah@patient.com', password: hashedPassword, phone: '01700000005', role: 'PATIENT' },
    ];

    for (const user of users) {
      try {
        await pool.execute(
          'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
          [user.name, user.email, user.password, user.phone, user.role]
        );
        console.log(`✓ User created: ${user.email}`);
      } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(`⊘ User already exists: ${user.email}`);
        } else {
          throw err;
        }
      }
    }

    // Get inserted user IDs
    const [userRows]: any = await pool.execute('SELECT id, email, role FROM users WHERE role IN (?, ?)', ['DOCTOR', 'PATIENT']);

    // Insert doctors
    const doctors = [
      {
        userId: userRows.find((u: any) => u.email === 'ahmed@mediconnect.com')?.id,
        specialization: 'Cardiology',
        hospital: 'Dhaka Medical Centre',
        bmdcNumber: 'BMDC001',
        experienceYears: 10,
        feesOnline: 500,
        feesPhysical: 1000,
      },
      {
        userId: userRows.find((u: any) => u.email === 'fatima@mediconnect.com')?.id,
        specialization: 'Pediatrics',
        hospital: 'National Hospital',
        bmdcNumber: 'BMDC002',
        experienceYears: 8,
        feesOnline: 400,
        feesPhysical: 800,
      },
    ];

    for (const doctor of doctors) {
      if (doctor.userId) {
        try {
          await pool.execute(
            'INSERT INTO doctors (userId, specialization, hospital, bmdcNumber, experienceYears, feesOnline, feesPhysical, available, isVerified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [doctor.userId, doctor.specialization, doctor.hospital, doctor.bmdcNumber, doctor.experienceYears, doctor.feesOnline, doctor.feesPhysical, true, true]
          );
          console.log(`✓ Doctor created: ${doctor.specialization} at ${doctor.hospital}`);
        } catch (err: any) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.log(`⊘ Doctor already exists for user ID ${doctor.userId}`);
          } else {
            throw err;
          }
        }
      }
    }

    // Insert ambulances
    const ambulances = [
      { driverName: 'Karim Driver', phone: '01800000001', plateNumber: 'AMBU-001', hospitalName: 'Dhaka Medical Centre', type: 'ICU', status: 'Active', locationLat: 23.8103, locationLon: 90.4125 },
      { driverName: 'Hasan Driver', phone: '01800000002', plateNumber: 'AMBU-002', hospitalName: 'National Hospital', type: 'AC', status: 'Active', locationLat: 23.7808, locationLon: 90.3692 },
      { driverName: 'Rashed Driver', phone: '01800000003', plateNumber: 'AMBU-003', hospitalName: 'Apollo Hospital', type: 'Non-AC', status: 'Active', locationLat: 23.8147, locationLon: 90.4104 },
    ];

    for (const ambulance of ambulances) {
      try {
        await pool.execute(
          'INSERT INTO ambulances (driverName, phone, plateNumber, hospitalName, type, status, locationLat, locationLon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [ambulance.driverName, ambulance.phone, ambulance.plateNumber, ambulance.hospitalName, ambulance.type, ambulance.status, ambulance.locationLat, ambulance.locationLon]
        );
        console.log(`✓ Ambulance created: ${ambulance.plateNumber} (${ambulance.type})`);
      } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(`⊘ Ambulance already exists: ${ambulance.plateNumber}`);
        } else {
          throw err;
        }
      }
    }

    console.log('\n✓ Seed data population complete!');
    console.log('\nTest credentials:');
    console.log('Admin: admin@mediconnect.com / password123');
    console.log('Doctor: ahmed@mediconnect.com / password123');
    console.log('Patient: john@patient.com / password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Do not close pool, keep it open for server
  }
};

export default seedDatabase;
