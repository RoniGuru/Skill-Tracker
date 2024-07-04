"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skill_1 = __importDefault(require("./routes/skill"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.listen(config_1.PORT, () => {
    console.log(config_1.PORT);
    console.log('listerning to port');
});
app.use(express_1.default.json());
app.use('/api/skills', skill_1.default);
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('mern');
});
