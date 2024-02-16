import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
