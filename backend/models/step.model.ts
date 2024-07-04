import { model, Schema } from 'mongoose';

export const StepSchema = new Schema({
  time: { type: Number, required: [true, 'Please enter time'] },

  date: { type: Date, default: Date.now, required: true },
});

export const Step = model('Step', StepSchema);
