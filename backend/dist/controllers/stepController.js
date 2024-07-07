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
            return res.status(500).json({ msg: 'skill not found' });
        }
        (0, skill_model_2.addStep)(skill, req.body.time);
        (0, skill_model_2.checkSkill)(skill);
        if (skill.skill_level > skill.nextRank.threshold) {
            (0, skill_model_2.updateRank)(skill);
        }
        yield skill.save();
        res.status(200).json(skill);
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
