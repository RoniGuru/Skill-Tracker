import express from 'express';
import mongoose from 'mongoose';
import skills from './routes/skill';
import { MONGO, PORT } from './config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/skills', skills);

mongoose
  .connect(MONGO!)

  .then(() => {
    console.log(PORT);
    app.listen(PORT, () => {
      console.log('listerning to port');
    });
  })
  .catch((error) => {
    console.log(error);
  });
