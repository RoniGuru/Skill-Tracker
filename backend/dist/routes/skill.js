"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skillController_1 = require("../controllers/skillController");
const router = express_1.default.Router();
router.get('/', skillController_1.getSkills);
router.post('/', skillController_1.createSkill);
router.get('/:id', skillController_1.getSkill);
router.put('/:id', skillController_1.updateSkill);
router.delete('/:id', skillController_1.deleteSkill);
router.post('/:id/steps', skillController_1.createStep);
router.get(':id/steps', skillController_1.getSteps);
exports.default = router;
