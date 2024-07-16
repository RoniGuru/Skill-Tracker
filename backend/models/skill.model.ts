import { model, Schema } from 'mongoose';

const StepSchema = new Schema(
  {
    time: { type: Number, required: [true, 'Please enter time'] },

    date: { type: Date, default: new Date(), required: true },
  },
  {
    timestamps: false,
  }
);

const RankSchema = new Schema(
  {
    name: { type: String, required: true },
    threshold: { type: Number, required: true },
  },
  { _id: false, timestamp: false }
);

export interface RankIF {
  name: string;
  threshold: number;
}
export interface StepIf {
  time: number;
  date: Date;
}

const setPrice = (value: Number) => {
  return parseFloat(value.toFixed(2));
};
export const SkillSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter skill name'],
    },
    total_time: { type: Number, default: 0 },
    skill_level: { type: Number, default: 0, set: setPrice },
    streak: { type: Number, default: 1 },
    biggest_streak: { type: Number, default: 1 },
    rank: { type: RankSchema, default: { name: 'none', threshold: 0 } },
    nextRank: {
      type: RankSchema,
      default: { name: 'Beginner_1', threshold: 120 },
    },
    steps: [StepSchema],
    created: { type: Date, default: new Date() },
  },
  {
    timestamps: false,
  }
);

export interface SkillIf {
  name: string;
  total_time: number;
  skill_level: number;
  streak: number;
  biggest_streak: number;
  rank: RankIF;
  nextRank: RankIF;
  steps?: StepIf[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const Skill = model('Skill', SkillSchema);
