import { model, Schema } from 'mongoose';

const StepSchema = new Schema(
  {
    time: { type: Number, required: [true, 'Please enter time'] },

    date: { type: Date, default: Date.now, required: true },
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
const skill_mastery = [
  { name: 'Beginner_1', threshold: 120 },
  { name: 'Beginner_2', threshold: 300 },
  { name: 'Beginner_3', threshold: 600 },
  { name: 'Beginner_4', threshold: 1200 },
  { name: 'Beginner_5', threshold: 3000 },

  { name: 'Intermediate_1', threshold: 4500 },
  { name: 'Intermediate_2', threshold: 6000 },
  { name: 'Intermediate_3', threshold: 7500 },
  { name: 'Intermediate_4', threshold: 9000 },
  { name: 'Intermediate_5', threshold: 12000 },

  { name: 'Proficient_1', threshold: 18000 },
  { name: 'Proficient_2', threshold: 24000 },
  { name: 'Proficient_3', threshold: 36000 },
  { name: 'Proficient_4', threshold: 48000 },
  { name: 'Proficient_5', threshold: 60000 },

  { name: 'Advanced_1', threshold: 120000 },
  { name: 'Advanced_2', threshold: 150000 },
  { name: 'Advanced_3', threshold: 180000 },
  { name: 'Advanced_4', threshold: 240000 },
  { name: 'Advanced_5', threshold: 300000 },

  { name: 'Expert_1', threshold: 360000 },
  { name: 'Expert_2', threshold: 420000 },
  { name: 'Expert_3', threshold: 480000 },
  { name: 'Expert_4', threshold: 540000 },
  { name: 'Expert_5', threshold: 600000 },

  { name: 'Master_1', threshold: 720000 },
  { name: 'Master_2', threshold: 840000 },
  { name: 'Master_3', threshold: 960000 },
  { name: 'Master_4', threshold: 1080000 },
  { name: 'Master_5', threshold: 1200000 },
];
export const SkillSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter skill name'],
    },
    total_time: { type: Number, default: 0 },
    skill_level: { type: Number, default: 0 },
    streak: { type: Number, default: 1 },
    biggest_streak: { type: Number, default: 1 },
    rank: { type: RankSchema, default: { name: 'none', threshold: 0 } },
    nextRank: {
      type: RankSchema,
      default: { name: 'Beginner_1', threshold: 120 },
    },
    steps: [StepSchema],
  },
  {
    timestamps: true,
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

export const streakCalculator = (lastStepDate: Date, currentStreak: number) => {
  const today = new Date();

  if (!isSameDay(today, lastStepDate)) {
    const diffTime = Math.abs(today.getTime() - lastStepDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Continue the streak
      currentStreak += 1;
    } else if (diffDays > 1) {
      // Missed a day, reset streak
      console.log(diffDays);
      currentStreak = 1 - diffDays;
    }
  }
  return currentStreak;
};

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const updateRank = (skill: SkillIf) => {
  const rank = skill_mastery.findIndex((l) => l.threshold >= skill.skill_level);
  if (rank === -1) {
    console.log('rank not found');
  } else {
    skill.rank = skill_mastery[rank];
    if (skill_mastery[rank + 1]) {
      skill.nextRank = skill_mastery[rank + 1];
    } else {
      skill.nextRank = { name: 'titan', threshold: 100000000 };
    }
  }
};
export const checkSkill = (skill: SkillIf) => {
  if (skill.steps) {
    const lastDate = skill.steps[skill.steps.length - 1].date;
    const todayDate = new Date();

    if (!isSameDay(todayDate, lastDate)) {
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        skill.streak += 1;
      } else if (diffDays > 1) {
        skill.streak = 1;
        const subtract_level = parseFloat(Math.pow(0.99, diffDays).toFixed(2));

        skill.skill_level -= subtract_level > 100 ? 100 : subtract_level;

        if (skill.skill_level < skill.rank.threshold) {
          skill.skill_level = skill.rank.threshold;
        }
      }
    }
  }
};

export const addStep = (skill: SkillIf, time: number) => {
  skill.steps?.push({ time: time, date: new Date() });
  skill.skill_level += parseFloat((time * (1 + skill.streak / 100)).toFixed(2));
};

export const Skill = model('Skill', SkillSchema);
