import express from 'express';
import mongoose from 'mongoose';
import skills from './routes/skill';

const app = express();
const port = 8000;
const string = process.env.VITE_MONGOOSE_STRING || 'none';

mongoose
  .connect(string)
  .then(() => {
    console.log('connected to database');

    app.listen(port, () => {
      console.log('server running');
    });
  })
  .catch(() => {
    console.log('server fail');
  });

app.use(express.json());
app.use('/api/skills', skills);
