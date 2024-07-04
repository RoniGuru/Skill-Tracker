"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = exports.StepSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StepSchema = new mongoose_1.Schema({
    time: { type: Number, required: [true, 'Please enter time'] },
    date: { type: Date, default: Date.now, required: true },
});
exports.Step = (0, mongoose_1.model)('Step', exports.StepSchema);
