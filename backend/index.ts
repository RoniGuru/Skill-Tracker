import express from 'express';
import mongoose from 'mongoose';
import skills from './routes/skill';
import { PORT } from './config';

const app = express();

app.listen(PORT!, () => {
  console.log(PORT);
  console.log('listerning to port');
});

app.use(express.json());
app.use('/api/skills', skills);
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('mern');
});
