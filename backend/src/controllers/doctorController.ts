import { Request, Response } from 'express';
import { Doctor } from '../models/Doctor';
import connectDB from '../config/db';

// @desc    Get all doctors with filters
// @route   GET /api/doctors
export const getDoctors = async (req: Request, res: Response) => {
  const connection = await connectDB();
  if (!connection) {
    return res.status(500).json({ message: 'Database connection failed' });
  }

  try {
    const { search, city, specialty, hospital } = req.query;
    
    let query = 'SELECT * FROM doctors WHERE status = ?';
    let params: (string | number)[] = ['Active'];

    if (specialty && specialty !== 'All Specialties') {
        query += ' AND specialization = ?';
        params.push(specialty.toString());
    }
    if (hospital && hospital !== 'All Hospitals') {
        query += ' AND hospital = ?';
        params.push(hospital.toString());
    }
    if (search) {
        query += ' AND (name LIKE ? OR hospital LIKE ?)';
        params.push(`%${search.toString()}%`);
        params.push(`%${search.toString()}%`);
    }
    // Note: City filtering would rely on a 'location' string regex or geospatial match in a real app, 
    // but for now, we'll keep it simple without a direct city column in the doctors table

    const [rows] = await connection.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    // using pool; do not end connection here
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
export const getDoctorById = async (req: Request, res: Response) => {
  const connection = await connectDB();
  if (!connection) {
    return res.status(500).json({ message: 'Database connection failed' });
  }

  try {
    const [rows] = await connection.execute(
      'SELECT d.*, u.name AS userName, u.email AS userEmail FROM doctors d JOIN users u ON d.userId = u.id WHERE d.id = ?',
      [req.params.id]
    );
    
    const doctor = (rows as Doctor[])[0];

    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    // using pool; do not end connection here
  }
};