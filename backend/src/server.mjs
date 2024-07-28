import express from 'express';
import mongoose from 'mongoose';
import { PORT, database } from './config.mjs';
import chatHistoryRouter from './route/chatHistoryRoute.mjs';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatHistoryRouter);

// Connect to MongoDB and start the server
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
  });
