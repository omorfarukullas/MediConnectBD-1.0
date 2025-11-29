import connectDB from './db';

const createTables = async () => {
  const connection = await connectDB();
  if (!connection) {
    console.error("Failed to connect to the database. Cannot create tables.");
    return;
  }

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role ENUM('PATIENT', 'DOCTOR', 'ADMIN', 'SUPER_ADMIN') DEFAULT 'PATIENT',
        hospitalId INT,
        image VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        specialization VARCHAR(255) NOT NULL,
        subSpecialization VARCHAR(255),
        hospital VARCHAR(255) NOT NULL,
        bmdcNumber VARCHAR(255) NOT NULL UNIQUE,
        experienceYears INT DEFAULT 0,
        degrees JSON,
        languages JSON,
        education JSON,
        feesOnline DECIMAL(10, 2) DEFAULT 0,
        feesPhysical DECIMAL(10, 2) DEFAULT 0,
        available BOOLEAN DEFAULT TRUE,
        isTelemedicineAvailable BOOLEAN DEFAULT FALSE,
        isVerified BOOLEAN DEFAULT FALSE,
        rating DECIMAL(2, 1) DEFAULT 0,
        reviews JSON,
        location VARCHAR(255),
        status ENUM('Active', 'Inactive', 'On Leave') DEFAULT 'Active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS ambulances (
        id INT AUTO_INCREMENT PRIMARY KEY,
        driverName VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        plateNumber VARCHAR(255) NOT NULL,
        hospitalName VARCHAR(255),
        type ENUM('ICU', 'AC', 'Non-AC', 'Freezer') DEFAULT 'Non-AC',
        status ENUM('Active', 'Busy', 'On the Way') DEFAULT 'Active',
        locationLat DECIMAL(10, 8),
        locationLon DECIMAL(11, 8),
        rating DECIMAL(2, 1) DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patientId INT NOT NULL,
        doctorId INT NOT NULL,
        patientName VARCHAR(255) NOT NULL,
        doctorName VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        time VARCHAR(255) NOT NULL,
        type ENUM('In-Person', 'Telemedicine') NOT NULL,
        status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled', 'Missed') DEFAULT 'Pending',
        queueNumber INT,
        symptoms TEXT,
        paymentStatus ENUM('Paid', 'Unpaid') DEFAULT 'Unpaid',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (patientId) REFERENCES users(id),
        FOREIGN KEY (doctorId) REFERENCES doctors(id)
      );
    `);

    console.log("Tables created or already exist.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    // Using a pool; do not end the pool here so connections can be reused
  }
};

export default createTables;
