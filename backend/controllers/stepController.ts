import { Step, StepSchema } from '../models/step.model';
import { Request, Response } from 'express';
import { Skill, SkillIf } from '../models/skill.model';

import { checkSkill, addStep, updateRank } from '../models/skill.model';

export const getSteps = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);

    if (!skill) {
      res.status(500).json({ msg: 'skill not found' });
    }

    res.status(200).json(skill!.steps);
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const createStep = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(500).json({ msg: 'skill not found' });
    }
    checkSkill(skill);
    addStep(skill, req.body.time);

    if (skill!.skill_level > skill!.nextRank.threshold) {
      //skill!.updateRank();
    }

    await skill!.save();
    res.status(200).json({ msg: 'step added' });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

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
