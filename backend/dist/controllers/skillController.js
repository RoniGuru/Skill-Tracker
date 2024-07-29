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
exports.createStep = exports.getSteps = exports.updateSkill = exports.deleteSkill = exports.createSkill = exports.getSkill = exports.getSkills = void 0;
const skillFunctions_1 = require("../services/skillFunctions");
const skill_model_1 = require("../models/skill.model");
const getSkills = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield skill_model_1.Skill.find({});
        skills.map((skill) => (0, skillFunctions_1.checkSkill)(skill));
        return res.status(200).json(skills);
    }
    catch (err) {
        if (err instanceof Error) {
            err.message = 'error checking the skills';
        }
        next(err);
    }
});
exports.getSkills = getSkills;
const getSkill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findById(id);
        res.status(200).json(skill);
    }
    catch (err) {
        if (err instanceof Error && err.message != '') {
            err.message = 'error getting a skill';
        }
        next(err);
    }
});
exports.getSkill = getSkill;
const createSkill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const skill = yield skill_model_1.Skill.create(req.body);
        yield skill.save();
        return res.status(200).json(skill);
    }
    catch (err) {
        if (err instanceof Error) {
            err.message = 'error creating a skill';
        }
        next(err);
    }
});
exports.createSkill = createSkill;
const deleteSkill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findByIdAndDelete(id);
        res.status(200).json({ msg: 'skill deleted' });
    }
    catch (err) {
        if (err instanceof Error) {
            err.message = 'error deleting a skill';
        }
        next(err);
    }
});
exports.deleteSkill = deleteSkill;
const updateSkill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: 'skill updated' });
    }
    catch (err) {
        if (err instanceof Error) {
            err.message = 'error updating a skill';
        }
        next(err);
    }
});
exports.updateSkill = updateSkill;
const getSteps = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findById(id);
        res.status(200).json(skill.steps);
    }
    catch (err) {
        if (err instanceof Error) {
            err.message = 'error getting a skill steps';
        }
        next(err);
    }
});
exports.getSteps = getSteps;
const createStep = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findById(id);
        if (!skill) {
            console.log('in loop');
            const error = new Error('skill is not found');
            error.status = 404;
            throw error;
        }
        (0, skillFunctions_1.addStep)(skill, req.body.time);
        if (skill.skill_level > skill.nextRank.threshold) {
            (0, skillFunctions_1.updateRank)(skill);
        }
        yield skill.save();
        res.status(200).json(skill);
    }
    catch (err) {
        if (err instanceof Error && err.message.length == 0) {
            err.message = 'error creating a skill steps';
        }
        next(err);
    }
});
exports.createStep = createStep;
