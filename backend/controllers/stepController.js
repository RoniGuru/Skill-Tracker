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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStep = exports.checkSkill = exports.createStep = exports.getSteps = void 0;
var skill_model_1 = require("../models/skill.model");
var getSteps = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, skill, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, skill_model_1.Skill.findById(id)];
            case 1:
                skill = _a.sent();
                if (!skill) {
                    res.status(500).json({ msg: 'skill not found' });
                }
                res.status(200).json(skill.steps);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ msg: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSteps = getSteps;
var createStep = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, skill, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, skill_model_1.Skill.findById(id)];
            case 1:
                skill = _a.sent();
                if (!skill) {
                    return [2 /*return*/, res.status(500).json({ msg: 'skill not found' })];
                }
                (0, exports.checkSkill)(skill);
                //skill!.addStep(req.body.time);
                if (skill.skill_level > skill.nextRank.threshold) {
                    //skill!.updateRank();
                }
                return [4 /*yield*/, skill.save()];
            case 2:
                _a.sent();
                res.status(200).json({ msg: 'step added' });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ msg: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createStep = createStep;
var checkSkill = function (skill) {
    if (skill.steps) {
        var lastDate = skill.steps[skill.steps.length - 1].date;
        var todayDate = new Date();
        if (!isSameDay(todayDate, lastDate)) {
            var diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                skill.streak += 1;
            }
            else if (diffDays > 1) {
                skill.streak = 1;
                var subtract_level = parseFloat(Math.pow(0.99, diffDays).toFixed(2));
                skill.skill_level -= subtract_level > 100 ? 100 : subtract_level;
                if (skill.skill_level < skill.rank.threshold) {
                    skill.skill_level = skill.rank.threshold;
                }
            }
        }
    }
};
exports.checkSkill = checkSkill;
var addStep = function (skill, time) {
    var _a;
    (_a = skill.steps) === null || _a === void 0 ? void 0 : _a.push({ time: time, date: new Date() });
    skill.skill_level += parseFloat((time * (1 + skill.streak / 100)).toFixed(2));
};
exports.addStep = addStep;
function isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
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
