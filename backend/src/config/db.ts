import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool for efficient reuse across requests
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONN_LIMIT || '10', 10),
  queueLimit: 0,
});

pool.getConnection()
  .then(conn => {
    console.log(`MySQL Pool Connected: ${conn.config.database}`);
    conn.release();
  })
  .catch(err => {
    // Log full error for diagnosis
    console.error('MySQL Pool connection error:', err);
    if (err && err.stack) console.error(err.stack);
    // Do not exit immediately here so the server process can show logs and remain available for debugging.
  });

const connectDB = async () => {
  return pool;
};

export default connectDB;