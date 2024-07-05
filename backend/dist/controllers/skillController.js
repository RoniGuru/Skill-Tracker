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
exports.updateSkill = exports.deleteSkill = exports.createSkill = exports.getSkill = exports.getSkills = void 0;
const skill_model_1 = require("../models/skill.model");
const getSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield skill_model_1.Skill.find({});
        console.log('get');
        res.status(200).json(skills);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.getSkills = getSkills;
const getSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findById(id);
        res.status(200).json(skill);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.getSkill = getSkill;
const createSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        if (!req.body.name) {
            return res.status(404).json({ msg: 'name is required' });
        }
        const skill = yield skill_model_1.Skill.create(req.body);
        yield skill.save();
        return res.status(200).json(skill);
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.createSkill = createSkill;
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findByIdAndDelete(id);
        if (!skill) {
            return res.status(404).json({ message: 'skill not found' });
        }
        res.status(200).json({ msg: 'skill deleted' });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.deleteSkill = deleteSkill;
const updateSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield skill_model_1.Skill.findByIdAndUpdate(id, req.body);
        if (!skill) {
            return res.status(404).json({ message: 'skill not found' });
        }
        res.status(200).json({ msg: 'skill updated' });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.updateSkill = updateSkill;
