"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDecay = exports.findDayDifference = exports.addStep = exports.checkSkill = exports.updateRank = exports.isSameDay = void 0;
const skillMastery_1 = require("../models/skillMastery");
const isSameDay = (date1, date2) => {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
};
exports.isSameDay = isSameDay;
const updateRank = (skill) => {
    const rank = skillMastery_1.skill_mastery.findIndex((l) => l.threshold >= skill.skill_level);
    if (rank === -1) {
        console.log('rank not found');
    }
    else {
        skill.rank = skillMastery_1.skill_mastery[rank];
        if (skillMastery_1.skill_mastery[rank + 1]) {
            skill.nextRank = skillMastery_1.skill_mastery[rank + 1];
        }
        else {
            skill.nextRank = { name: 'Titan', threshold: 100000000 };
        }
    }
};
exports.updateRank = updateRank;
const checkSkill = (skill) => {
    if (skill.steps && skill.steps.length > 0) {
        const lastDate = skill.steps.length == 1
            ? skill.steps[0].date
            : skill.steps[skill.steps.length - 1].date;
        const todayDate = new Date();
        if (!(0, exports.isSameDay)(todayDate, lastDate)) {
            const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                skill.streak += 1;
            }
            else if (diffDays > 1) {
                skill.streak = 1;
                skill.skill_level -= (0, exports.calculateDecay)(skill.skill_level, diffDays);
            }
        }
    }
    if (skill.skill_level < skill.rank.threshold) {
        skill.skill_level = skill.rank.threshold;
    }
};
exports.checkSkill = checkSkill;
const addStep = (skill, time) => {
    var _a;
    (_a = skill.steps) === null || _a === void 0 ? void 0 : _a.push({ time: time, date: new Date() });
    skill.total_time += time;
    (0, exports.checkSkill)(skill);
    skill.skill_level += Number((time * (1 + skill.streak / 100)).toFixed(2));
};
exports.addStep = addStep;
const findDayDifference = (date1, date2) => {
    let timeDiff = date2.getTime() - date1.getTime();
    let dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
    return Math.abs(dayDiff);
};
exports.findDayDifference = findDayDifference;
const calculateDecay = (level, days) => {
    const decay = level * Math.pow(0.99, days - 1);
    const difference = Number((level - decay).toFixed(2));
    const maxDecay = 120 * (days - 1);
    return difference > maxDecay ? maxDecay : difference;
};
exports.calculateDecay = calculateDecay;
