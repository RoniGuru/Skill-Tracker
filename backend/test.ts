import mongoose from 'mongoose';
import { Skill, SkillSchema } from './models/skill.model';
import { addStep } from './models/skill.model';

const skills: any = [];
const test_skill = new Skill({ name: 'reading' });
addStep(test_skill, 23);

console.log(test_skill);

// methods: {
//     addStep(time: number) {
//       this.steps.push({ time: time });
//       this.total_time += time;

//       //convert time to skill level
//       this.skill_level += parseFloat(
//         (time * (1 + this.streak / 100)).toFixed(2)
//       );
//     },
//     checkDay(todayDate: Date) {
//       if (this.steps) {
//         const lastDate = this.steps[this.steps.length - 1].date;
//         if (!isSameDay(todayDate, lastDate)) {
//           const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
//           const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//           if (diffDays === 1) {
//             this.streak += 1;
//           } else if (diffDays > 1) {
//             this.streak = 1;
//             const subtract_level = parseFloat(
//               Math.pow(0.99, diffDays).toFixed(2)
//             );

//             this.skill_level -= subtract_level > 100 ? 100 : subtract_level;

//             if (this.skill_level < this.rank.threshold) {
//               this.skill_level = this.rank.threshold;
//             }
//           }
//         }
//       }
//     },
//     updateRank() {
//       const rank = skill_mastery.findIndex(
//         (l) => l.threshold >= this.skill_level
//       );
//       if (rank === -1) {
//         console.log('rank not found');
//       } else {
//         this.rank = skill_mastery[rank];
//         if (skill_mastery[rank + 1]) {
//           this.nextRank = skill_mastery[rank + 1];
//         } else {
//           this.nextRank = { name: 'titan', threshold: 100000000 };
//         }
//       }
//     },
//   },
