"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const skill_1 = __importDefault(require("./routes/skill"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/skills', skill_1.default);
app.get('*', (req, res) => res.json('route not available'));
app.use(errorHandler_1.errorHandler);
mongoose_1.default
    .connect(config_1.MONGO)
    .then(() => {
    console.log(config_1.PORT);
    app.listen(config_1.PORT, () => {
        console.log('listening to port');
    });
})
    .catch((error) => {
    console.log(error);
});
