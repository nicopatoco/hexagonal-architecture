import { connectToDatabase } from '../../database/mongoDBConnection';
import express from 'express';
import corse from 'cors';
import morgan from 'morgan';
import appRouter from './routes/appRoutes';
import { protect } from '../security/TokenManager';

const startServer = async () => {
  await connectToDatabase();

  const app = express();
  app.use(corse());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Dynamically import user routes after database connection
  const { login, register } = (await import('./routes/userRoutes')).default;

  app.use('/api', protect, appRouter);
  app.post('/register', register);
  app.post('/login', login);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch(console.error);
