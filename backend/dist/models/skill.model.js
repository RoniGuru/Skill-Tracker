"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = exports.calculateMastery = void 0;
const mongoose_1 = require("mongoose");
const StepSchema = new mongoose_1.Schema({
    time: { type: Number, required: [true, 'Please enter time'] },
    date: { type: Date, default: Date.now, required: true },
});
const RankSchema = new mongoose_1.Schema({
    name: { type: String, default: 'none' },
    threshold: { type: Number, default: 0 },
});
const skill_mastery = {
    Beginner: {
        Beginner_1: 120,
        Beginner_2: 300,
        Beginner_3: 600,
        Beginner_4: 1200,
        Beginner_5: 3000,
    },
    Intermediate: {
        Intermediate_1: 4500,
        Intermediate_2: 6000,
        Intermediate_3: 7500,
        Intermediate_4: 9000,
        Intermediate_5: 12000,
    },
    Proficient: {
        Proficient_1: 18000,
        Proficient_2: 24000,
        Proficient_3: 36000,
        Proficient_4: 48000,
        Proficient_5: 60000,
    },
    Advanced: {
        Advanced_1: 120000,
        Advanced_2: 150000,
        Advanced_3: 180000,
        Advanced_4: 240000,
        Advanced_5: 300000,
    },
    Expert: {
        Expert_1: 360000,
        Expert_2: 420000,
        Expert_3: 480000,
        Expert_4: 540000,
        Expert_5: 600000,
    },
    Master: {
        Master_1: 720000,
        Master_2: 840000,
        Master_3: 960000,
        Master_4: 1080000,
        Master_5: 1200000,
    },
};
const SkillSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please enter skill name'],
    },
    total_time: { type: Number, default: 0 },
    skill_level: { type: Number, default: 0 },
    streak: { type: Number, default: 1 },
    biggest_streak: { type: Number, default: 0 },
    rank: { type: RankSchema },
    steps: [StepSchema],
    lastStepDate: { type: Date },
}, {
    timestamps: true,
});
const calculateMastery = (skill_level, currentRank = null) => {
    let rank = { name: 'none', threshold: 0 };
    let start = false;
    if (currentRank && currentRank.name && currentRank.threshold) {
        for (const [mastery, levels] of Object.entries(skill_mastery)) {
            console.log(`${mastery}  ${currentRank.name.slice(0, -2)}`);
            if (mastery === currentRank.name.slice(0, -2)) {
                console.log('started');
                start = true;
            }
            else if (start && mastery !== currentRank.name.slice(0, -2)) {
                start = false;
            }
            else if (start) {
                continue;
            }
            for (const [level, threshold] of Object.entries(levels)) {
                if (skill_level >= threshold) {
                    console.log('ranked');
                    rank = { name: level, threshold };
                }
                if (skill_level < threshold) {
                    return rank;
                }
            }
        }
    }
    else {
        console.log('no rank');
        for (const [mastery, levels] of Object.entries(skill_mastery)) {
            for (const [level, threshold] of Object.entries(levels)) {
                if (skill_level > threshold) {
                    rank = { name: level, threshold };
                }
                if (skill_level < threshold) {
                    return rank;
                }
            }
        }
    }
    return rank;
};
exports.calculateMastery = calculateMastery;
exports.Skill = (0, mongoose_1.model)('Skill', SkillSchema);
