import { checkSkill, addStep, updateRank } from '../services/skillFunctions';
import { NextFunction, Request, Response } from 'express';
import { Skill } from '../models/skill.model';
import { StatusError } from '../utils/StatusError';

export const getSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skills = await Skill.find({});

    skills.map((skill) => checkSkill(skill));
    return res.status(200).json(skills);
  } catch (err) {
    if (err instanceof Error) {
      err.message = 'error checking the skills';
    }
    next(err);
  }
};

export const getSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);

    res.status(200).json(skill);
  } catch (err: any) {
    if (err instanceof Error && err.message != '') {
      err.message = 'error getting a skill';
    }
    next(err);
  }
};

export const createSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const skill = await Skill.create(req.body);

    await skill.save();
    return res.status(200).json(skill);
  } catch (err) {
    if (err instanceof Error) {
      err.message = 'error creating a skill';
    }
    next(err);
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);

    res.status(200).json({ msg: 'skill deleted' });
  } catch (err) {
    if (err instanceof Error) {
      err.message = 'error deleting a skill';
    }
    next(err);
  }
};

export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndUpdate(id, req.body);

    res.status(200).json({ msg: 'skill updated' });
  } catch (err: any) {
    if (err instanceof Error) {
      err.message = 'error updating a skill';
    }
    next(err);
  }
};

export const getSteps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);

    res.status(200).json(skill!.steps);
  } catch (err) {
    if (err instanceof Error) {
      err.message = 'error getting a skill steps';
    }
    next(err);
  }
};

export const createStep = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);

    if (!skill) {
      console.log('in loop');
      const error: StatusError = new Error('skill is not found') as StatusError;
      error.status = 404;
      throw error;
    }

    addStep(skill!, req.body.time);

    if (skill!.skill_level > skill!.nextRank.threshold) {
      updateRank(skill);
    }

    await skill!.save();
    res.status(200).json(skill);
  } catch (err) {
    if (err instanceof Error && err.message.length == 0) {
      err.message = 'error creating a skill steps';
    }
    next(err);
  }
};
