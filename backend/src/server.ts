import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db';
import createTables from './config/createTables';
import seedDatabase from './config/seed';

import doctorRoutes from './routes/doctorRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import emergencyRoutes from './routes/emergencyRoutes';

dotenv.config();
connectDB();
createTables();

// Optional: seed data on startup (only if SEED_DATA=true in .env)
if (process.env.SEED_DATA === 'true') {
  seedDatabase();
}

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/emergency', emergencyRoutes);
// Socket.io for Real-time Features (Queue, Chat)
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);

    // Join a specific doctor's queue room
    socket.on('join_queue', (doctorId) => {
        socket.join(`queue_${doctorId}`);
    });

    // Handle Queue Update (Admin triggers this)
    socket.on('update_queue', (data) => {
        // data: { doctorId, currentToken }
        io.to(`queue_${data.doctorId}`).emit('queue_updated', data);
    });

    // WebRTC Signaling for Telemedicine
    socket.on('call_user', (data) => {
        io.to(data.userToCall).emit('call_incoming', { signal: data.signalData, from: data.from });
    });

    socket.on('answer_call', (data) => {
        io.to(data.to).emit('call_accepted', data.signal);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown (only respond to explicit SIGINT from terminal, not from child processes)
let shutdownInProgress = false;

process.on('SIGINT', async () => {
  if (shutdownInProgress) return; // Prevent multiple signals
  shutdownInProgress = true;
  console.log('\n📊 Shutting down gracefully...');
  io.close();
  server.close(() => {
    console.log('✓ Server closed');
    process.exit(0);
  });
  
  // Force exit after 5 seconds
  setTimeout(() => {
    console.warn('⚠ Forced shutdown after timeout');
    process.exit(1);
  }, 5000);
});

process.on('SIGTERM', async () => {
  if (shutdownInProgress) return;
  shutdownInProgress = true;
  console.log('\n📊 Shutting down gracefully (SIGTERM)...');
  io.close();
  server.close(() => {
    console.log('✓ Server closed');
    process.exit(0);
  });
});