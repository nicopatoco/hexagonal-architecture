import express from 'express';
import userRoutes from './routes/userRoutes';
import corse from 'cors';
import morgan from 'morgan';

const app = express();

app.use(corse()); // to allow cross origin request
app.use(morgan('dev')); // dev logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the user routes
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
