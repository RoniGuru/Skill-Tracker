"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const skill_1 = __importDefault(require("./routes/skill"));
const app = (0, express_1.default)();
const port = 8000;
const string = 'mongodb+srv://dbUse:dopenope45@backenddb.mvvfly9.mongodb.net/?retryWrites=true&w=majority&appName=backenddb';
mongoose_1.default
    .connect(string)
    .then(() => {
    console.log('connected to database');
    // console.log(calculateMastery(200, { name: 'Expert_1', threshold: 360023 }));
    app.listen(port, () => {
        console.log('server running');
    });
})
    .catch(() => {
    console.log('server fail');
});
app.use(express_1.default.json());
app.use('/api/skills', skill_1.default);
