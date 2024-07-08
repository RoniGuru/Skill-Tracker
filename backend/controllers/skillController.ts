import { checkSkill, Skill } from '../models/skill.model';
import { Request, Response } from 'express';

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find({});
    skills.map((skill) => checkSkill(skill));
    res.status(200).json(skills);
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);
    res.status(200).json(skill);
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    if (!req.body.name) {
      return res.status(404).json({ msg: 'name is required' });
    }
    const skill = await Skill.create(req.body);

    await skill.save();
    return res.status(200).json(skill);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return res.status(404).json({ message: 'skill not found' });
    }
    res.status(200).json({ msg: 'skill deleted' });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndUpdate(id, req.body);
    if (!skill) {
      return res.status(404).json({ message: 'skill not found' });
    }
    res.status(200).json({ msg: 'skill updated' });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
