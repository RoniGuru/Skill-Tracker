"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = exports.streakCalculator = exports.SkillSchema = void 0;
var mongoose_1 = require("mongoose");
var StepSchema = new mongoose_1.Schema({
    time: { type: Number, required: [true, 'Please enter time'] },
    date: { type: Date, default: Date.now, required: true },
}, {
    timestamps: false,
});
var RankSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    threshold: { type: Number, required: true },
}, { _id: false, timestamp: false });
var skill_mastery = [
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
exports.SkillSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
var streakCalculator = function (lastStepDate, currentStreak) {
    var today = new Date();
    if (!isSameDay(today, lastStepDate)) {
        var diffTime = Math.abs(today.getTime() - lastStepDate.getTime());
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            // Continue the streak
            currentStreak += 1;
        }
        else if (diffDays > 1) {
            // Missed a day, reset streak
            console.log(diffDays);
            currentStreak = 1 - diffDays;
        }
    }
    return currentStreak;
};
exports.streakCalculator = streakCalculator;
function isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
exports.Skill = (0, mongoose_1.model)('Skill', exports.SkillSchema);
