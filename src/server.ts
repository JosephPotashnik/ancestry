import express from 'express';
import dotenv from 'dotenv';
import {monarchRouter} from './routes/monarchRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/monarchs', monarchRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});