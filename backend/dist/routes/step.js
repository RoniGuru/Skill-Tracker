"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stepController_1 = require("../controllers/stepController");
const router = express_1.default.Router();
router.post('/:id', stepController_1.createStep);
exports.default = router;
