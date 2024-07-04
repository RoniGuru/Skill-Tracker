import express from 'express';
import mongoose from 'mongoose';
import skills from './routes/skill';

const app = express();
const port = 8000;
const string =
  'mongodb+srv://dbUse:dopenope45@backenddb.mvvfly9.mongodb.net/?retryWrites=true&w=majority&appName=backenddb';

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
