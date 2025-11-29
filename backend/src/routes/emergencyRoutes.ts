import express from 'express';
import connectDB from '../config/db';

const router = express.Router();

// Get Ambulances near lat/lng (within 5 km)
router.get('/nearby', async (req, res) => {
    const { lat, lng } = req.query;

    if(!lat || !lng) return res.status(400).json({ message: "Coordinates required" });

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);

    const connection = await connectDB();
    if (!connection) return res.status(500).json({ message: 'Database connection failed' });

    try {
        // Haversine formula to calculate distance (km)
        const sql = `
          SELECT *,
            (6371 * acos(
              cos(radians(?)) * cos(radians(locationLat)) * cos(radians(locationLon) - radians(?)) +
              sin(radians(?)) * sin(radians(locationLat))
            )) AS distance
          FROM ambulances
          WHERE status != 'Busy'
          HAVING distance <= 5
          ORDER BY distance ASC;
        `;

        const [rows] = await connection.execute(sql, [latitude, longitude, latitude]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error finding ambulances" });
    } finally {
      // using pool; do not end connection here
    }
});

export default router;