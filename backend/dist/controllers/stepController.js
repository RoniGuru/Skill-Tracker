"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStep = exports.getSteps = void 0;
const skill_model_1 = require("../models/skill.model");
const skill_model_2 = require("../models/skill.model");
const getSteps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findById(id);
        if (!skill) {
            res.status(500).json({ msg: 'skill not found' });
        }
        res.status(200).json(skill.steps);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.getSteps = getSteps;
const createStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findById(id);
        if (!skill) {
            res.status(500).json({ msg: 'skill not found' });
        }
        const today = new Date();
        const todayString = today.toDateString();
        const lastStepDate = skill.lastStepDate
            ? new Date(skill.lastStepDate)
            : null;
        const lastStepDateString = lastStepDate
            ? lastStepDate.toDateString()
            : null;
        if (lastStepDateString !== todayString) {
            if (lastStepDate) {
                const diffTime = Math.abs(today.getTime() - lastStepDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    // Continue the streak
                    skill.streak += 1;
                }
                else if (diffDays > 1) {
                    // Missed a day, reset streak
                    skill.streak = 1;
                    skill.skill_level *= parseFloat(Math.pow(0.99, diffDays - 1).toFixed(2));
                }
            }
        }
        skill.steps.push(req.body);
        skill.total_time += req.body.time;
        skill.skill_level += parseFloat((req.body.time * (1 + skill.streak / 100)).toFixed(2));
        if (skill.skill_level < skill.rank.threshold) {
            skill.skill_level = skill.rank.threshold;
        }
        if (!skill.rank) {
            skill.rank = (0, skill_model_2.calculateMastery)(skill.skill_level);
        }
        else {
            skill.rank = (0, skill_model_2.calculateMastery)(skill.skill_level, {
                name: skill.rank.name,
                threshold: skill.rank.threshold,
            });
        }
        if (skill.streak > skill.biggest_streak) {
            skill.biggest_streak = skill.streak;
        }
        yield skill.save();
        res.status(200).json({ msg: 'step added' });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.createStep = createStep;
// export const deleteStep = async (req: Request, res: Response) => {
//   try {
//     const { pId, cId } = req.params;
//     const skill = await Skill.findById(pId);
//     console.log(skill);
//     if (!skill) {
//       res.status(404).json({ msg: 'skill not found' });
//     }
//     const step = skill!.steps.id(cId);
//     if (step) {
//       step.deleteOne();
//       await skill!.save();
//       res.status(200).json({ msg: 'step deleted' });
//     } else {
//       res.status(404).json({ msg: 'step not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ msg: error.message });
//   }
// };
