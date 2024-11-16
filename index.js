// app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from './src/database/models/index.js';
import routes from './src/routes/index.js';
import contextMiddleware from './src/middlewares/context.middleware.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { namespaces } from './src/socket-resource/namespace/index.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Create an HTTP server for Socket.IO integration
const server = http.createServer(app);

// Initialize Socket.IO
export const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || '*', // Allow requests from the client (adjust for production)
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
namespaces()

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS (adjust options as needed for production)
app.use(cors());

// MongoDB connection URL (from .env file)
const mongoURI = process.env.MONGO_DB_URL;

// Connect to MongoDB
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => {
        console.error('❌ Could not connect to MongoDB:', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

// Attach custom middleware and routes
app.use(contextMiddleware);
app.use('/api', routes);

// Socket.IO connection handling
io.on('connection', (socket) => {
   
    console.log("Got connection")
   
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
