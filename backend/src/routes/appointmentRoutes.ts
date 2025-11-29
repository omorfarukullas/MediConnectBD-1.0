import express from 'express';
import { protect } from '../middleware/authMiddleware';
import connectDB from '../config/db';
import { Appointment } from '../models/Appointment'; // Assuming you still want to use the interface

const router = express.Router();

// Get My Appointments
router.get('/my', protect, async (req: any, res) => {
    const connection = await connectDB();
    if (!connection) {
        return res.status(500).json({ message: 'Database connection failed' });
    }
    try {
        const [rows] = await connection.execute('SELECT * FROM appointments WHERE patientId = ?', [req.user.id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    } finally {
        // using pool; do not end connection here
    }
});

// Book Appointment
router.post('/', protect, async (req: any, res) => {
    const connection = await connectDB();
    if (!connection) {
        return res.status(500).json({ message: 'Database connection failed' });
    }
    try {
        const { doctorId, doctorName, date, time, type, symptoms } = req.body;
        
        // Generate simple queue number logic
        const [countRows] = await connection.execute(
            'SELECT COUNT(*) as count FROM appointments WHERE doctorId = ? AND date = ?',
            [doctorId, date]
        );
        const count = (countRows as any[])[0].count;
        
        const appointment: Appointment = {
            patientId: req.user.id,
            patientName: req.user.name || 'Patient',
            doctorId: doctorId,
            doctorName: doctorName,
            date: date,
            time: time,
            type: type,
            symptoms: symptoms,
            queueNumber: count + 1,
            status: 'Confirmed',
        };

        const [result] = await connection.execute(
            'INSERT INTO appointments (patientId, doctorId, patientName, doctorName, date, time, type, symptoms, queueNumber, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                appointment.patientId,
                appointment.doctorId,
                appointment.patientName,
                appointment.doctorName,
                appointment.date,
                appointment.time,
                appointment.type,
                appointment.symptoms,
                appointment.queueNumber,
                appointment.status
            ]
        );

        res.status(201).json({ id: (result as any).insertId, ...appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    } finally {
        // using pool; do not end connection here
    }
});

export default router;