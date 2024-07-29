"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = exports.SkillSchema = void 0;
const mongoose_1 = require("mongoose");
const StepSchema = new mongoose_1.Schema({
    time: { type: Number, required: [true, 'Please enter time'] },
    date: { type: Date, default: new Date(), required: true },
}, {
    timestamps: false,
});
const RankSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    threshold: { type: Number, required: true },
}, { _id: false, timestamp: false });
const formatSkillLevel = (value) => {
    return parseFloat(value.toFixed(2));
};
exports.SkillSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please enter skill name'],
    },
    total_time: { type: Number, default: 0 },
    skill_level: { type: Number, default: 0, set: formatSkillLevel },
    streak: { type: Number, default: 1 },
    biggest_streak: { type: Number, default: 1 },
    rank: { type: RankSchema, default: { name: 'none', threshold: 0 } },
    nextRank: {
        type: RankSchema,
        default: { name: 'Beginner_1', threshold: 120 },
    },
    steps: [StepSchema],
    created: { type: Date, default: new Date() },
}, {
    timestamps: false,
});
exports.Skill = (0, mongoose_1.model)('Skill', exports.SkillSchema);
