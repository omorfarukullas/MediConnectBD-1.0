import { Request, Response } from 'express';
import connectDB from '../config/db';

// @desc    Get live queue for a doctor
// @route   GET /api/queue/:doctorId
export const getQueueStatus = async (req: Request, res: Response) => {
  const { doctorId } = req.params as any;
  const today = new Date().toISOString().split('T')[0];

  const connection = await connectDB();
  if (!connection) return res.status(500).json({ message: 'Database connection failed' });

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM appointments WHERE doctorId = ? AND date = ? AND status IN (?, ?) ORDER BY queueNumber ASC',
      [doctorId, today, 'Confirmed', 'Pending']
    );

    const appointments = rows as any[];
    const currentServing = appointments.find(a => a.status === 'Confirmed');

    res.json({
      totalWaiting: appointments.length,
      currentServingToken: currentServing?.queueNumber || 0,
      list: appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    // using pool; do not end connection here
  }
};

// @desc    Advance Queue (Socket.io Trigger usually)
// @route   POST /api/queue/:doctorId/next
export const nextPatient = async (req: Request, res: Response) => {
  const { doctorId } = req.params as any;
  const pool = await connectDB();
  if (!pool) return res.status(500).json({ message: 'Database connection failed' });

  const connection = await (pool as any).getConnection();
  try {
    await connection.beginTransaction();

    // Mark currently confirmed as Completed
    const [currentRows] = await connection.execute(
      'SELECT * FROM appointments WHERE doctorId = ? AND status = ? ORDER BY queueNumber ASC LIMIT 1',
      [doctorId, 'Confirmed']
    );
    const current = (currentRows as any[])[0];

    if (current) {
      await connection.execute('UPDATE appointments SET status = ? WHERE id = ?', ['Completed', current.id]);
    }

    // Promote next pending to confirmed
    const [nextRows] = await connection.execute(
      'SELECT * FROM appointments WHERE doctorId = ? AND status = ? ORDER BY queueNumber ASC LIMIT 1',
      [doctorId, 'Pending']
    );
    const next = (nextRows as any[])[0];
    if (next) {
      await connection.execute('UPDATE appointments SET status = ? WHERE id = ?', ['Confirmed', next.id]);
    }

    await connection.commit();

    res.json({ message: 'Queue advanced', previous: current || null, next: next || null });
  } catch (error) {
    console.error(error);
    try { await connection.rollback(); } catch (e) { /* ignore */ }
    res.status(500).json({ message: 'Failed to advance queue' });
  } finally {
    try { connection.release(); } catch (e) { /* ignore */ }
  }
}