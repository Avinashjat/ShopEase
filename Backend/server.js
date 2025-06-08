import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongoDb.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from './routes/productRoutes.js';
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(cors({
  origin: "*", // Vite frontend origin
  credentials: true, // Allow cookies if needed
}));


app.use('/api/users', userRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/products', productRoutes);



app.get('/', (req, res) => {
  res.json({ message: 'API is running 🚀' });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
