import { Types } from 'mongoose';
export interface SkillIf {
  _id: Types.ObjectId;
  name: string;
  total_time: number;
  skill_level: number;
  streak: number;
  biggest_streak: number;
  rank: RankIF;
  nextRank: RankIF;
  steps?: StepIf[];
  created: Date;
}

export interface SkillFunctionsIf {
  deleteSkill: (id: Types.ObjectId) => Promise<void>;
  updateSkill: (id: Types.ObjectId) => Promise<void>;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
export interface RankIF {
  name: string;
  threshold: number;
}
export interface StepIf {
  time: number;
  date: Date;
}
