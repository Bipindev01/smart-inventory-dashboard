import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.routes.js';

const app = express();

// CORS Configuration - Allow frontend to access backend
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/', productsRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Smart Inventory API is running ✅' });
});

export default app;