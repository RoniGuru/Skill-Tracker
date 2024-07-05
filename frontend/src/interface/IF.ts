export interface SkillIf {
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

export interface RankIF {
  name: string;
  threshold: number;
}
export interface StepIf {
  time: number;
  date: Date;
}

export const skillExample: SkillIf[] = [
  {
    name: 'JavaScript Programming',
    total_time: 7000, // in minutes
    skill_level: 7600, // Assuming a scale from 1 to 10
    streak: 10, // Number of consecutive days/hours of practice
    biggest_streak: 15, // Longest streak of consecutive days/hours of practice
    rank: { name: 'Intermediate_3', threshold: 7500 }, // Corresponds to 'Intermediate_3' with threshold of 7500 minutes
    nextRank: { name: 'Intermediate_4', threshold: 9000 }, // Corresponds to 'Intermediate_4' with threshold of 9000 minutes
    steps: [
      {
        time: 120, // Time spent in minutes
        date: new Date('2024-06-01'),
      },
      {
        time: 90,
        date: new Date('2024-06-02'),
      },
      {
        time: 180,
        date: new Date('2024-06-03'),
      },
    ],
    created: new Date('2024-01-01'),
  },
  {
    name: 'Reading ',
    total_time: 7000, // in minutes
    skill_level: 7600, // Assuming a scale from 1 to 10
    streak: 10, // Number of consecutive days/hours of practice
    biggest_streak: 15, // Longest streak of consecutive days/hours of practice
    rank: { name: 'Intermediate_3', threshold: 7500 }, // Corresponds to 'Intermediate_3' with threshold of 7500 minutes
    nextRank: { name: 'Intermediate_4', threshold: 9000 }, // Corresponds to 'Intermediate_4' with threshold of 9000 minutes
    steps: [
      {
        time: 120, // Time spent in minutes
        date: new Date('2024-06-01'),
      },
      {
        time: 90,
        date: new Date('2024-06-02'),
      },
      {
        time: 180,
        date: new Date('2024-06-03'),
      },
    ],
    created: new Date('2024-01-01'),
  },
  {
    name: 'Running',
    total_time: 600, // in minutes
    skill_level: 6600, // Assuming a scale from 1 to 10
    streak: 10, // Number of consecutive days/hours of practice
    biggest_streak: 15, // Longest streak of consecutive days/hours of practice
    rank: { name: 'Intermediate_3', threshold: 7500 }, // Corresponds to 'Intermediate_3' with threshold of 7500 minutes
    nextRank: { name: 'Intermediate_4', threshold: 9000 }, // Corresponds to 'Intermediate_4' with threshold of 9000 minutes
    steps: [
      {
        time: 120, // Time spent in minutes
        date: new Date('2024-06-01'),
      },
      {
        time: 90,
        date: new Date('2024-06-02'),
      },
      {
        time: 180,
        date: new Date('2024-06-03'),
      },
    ],
    created: new Date('2024-01-01'),
  },
];
