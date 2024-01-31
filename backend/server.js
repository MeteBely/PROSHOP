import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

connectDB();
const app = express();

//body parser middleware for req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //postman'da urlencoded kullanıyoruz.

//Cookie parser middleware
app.use(cookieParser()); //req.cookie'ye erişmemize olanak tanır.

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/stripe', (req, res) => res.json(process.env.STRIPE_PUBLISHABLE_KEY)); //Front(client) side'da kullanıcının ulaşmaması için tutmak istemezsin.

const __dirname = path.resolve(); //image upload için
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on, port ${PORT}`));
