import express from 'express';
import {
  deleteSkill,
  getSkill,
  getSkills,
  updateSkill,
  createSkill,
} from '../controllers/skillController';

import { createStep, getSteps } from '../controllers/stepController';

const router = express.Router();

router.get('/', getSkills);
router.post('/', createSkill);
router.get('/:id', getSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

router.post('/:id/steps', createStep);
router.get(':id/steps', getSteps);

export default router;
