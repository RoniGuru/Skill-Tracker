import express from 'express';
import mongoose from 'mongoose';
import skills from './routes/skill';
import { MONGO, PORT } from './config';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/skills', skills);
app.get('*', (req, res) => res.json('route not available'));
app.use(errorHandler);

mongoose
  .connect(MONGO!)

  .then(() => {
    console.log(PORT);
    app.listen(PORT, () => {
      console.log('listening to port');
    });
  })
  .catch((error) => {
    console.log(error);
  });
