import { skill_mastery } from '../models/skillMastery';
import { SkillIf, StepIf } from '../models/skill.model';

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const updateRank = (skill: SkillIf) => {
  const rank = skill_mastery.findIndex((l) => l.threshold >= skill.skill_level);
  if (rank === -1) {
    console.log('rank not found');
  } else {
    skill.rank = skill_mastery[rank];
    if (skill_mastery[rank + 1]) {
      skill.nextRank = skill_mastery[rank + 1];
    } else {
      skill.nextRank = { name: 'Titan', threshold: 100000000 };
    }
  }
};
export const checkSkill = (skill: SkillIf) => {
  if (skill.steps && skill.steps.length > 0) {
    const lastDate =
      skill.steps.length == 1
        ? skill.steps[0].date
        : skill.steps[skill.steps.length - 1].date;
    const todayDate = new Date();

    if (!isSameDay(todayDate, lastDate)) {
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        skill.streak += 1;
      } else if (diffDays > 1) {
        skill.streak = 1;
        skill.skill_level -= calculateDecay(skill.skill_level, diffDays);
      }
    }
  }
  if (skill.skill_level < skill.rank.threshold) {
    skill.skill_level = skill.rank.threshold;
  }
};

export const addStep = (skill: SkillIf, time: number) => {
  skill.steps?.push({ time: time, date: new Date() });
  skill.total_time += time;
  checkSkill(skill);
  skill.skill_level += parseFloat((time * (1 + skill.streak / 100)).toFixed(2));
};
export const findDayDifference = (date1: Date, date2: Date) => {
  let timeDiff = date2.getTime() - date1.getTime();

  let dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));

  return Math.abs(dayDiff);
};

export const calculateDecay = (level: number, days: number) => {
  const decay = level * Math.pow(0.99, days - 1);
  const difference = parseFloat((level - decay).toFixed(2));
  const maxDecay = 120 * (days - 1);

  return difference > maxDecay ? maxDecay : difference;
};
