import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { connectToDatabase } from '../../database/mongoDBConnection';
import appRouter from './routes/appRoutes';
import { protect } from './routes/protectRoutes';

const startServer = async () => {
  await connectToDatabase();

  const app = express();
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Dynamically import user routes after database connection
  const { login, register } = (await import('./routes/userRoutes')).default;

  app.post('/register', register);
  app.post('/login', login);
  // Apply protect middleware to other routes that require authentication
  app.use('/api', protect);
  app.use('/api', appRouter);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch(console.error);
