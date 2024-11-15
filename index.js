// app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from './src/database/models/index.js';
import routes from './src/routes/index.js';
import contextMiddleware from './src/middlewares/context.middleware.js';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URL (replace `<your_mongodb_connection_string>` with your actual MongoDB URI)
const mongoURI = process.env.MONGO_DB_URL;

// Connect to MongoDB
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(contextMiddleware)
app.use('/api',routes)
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

