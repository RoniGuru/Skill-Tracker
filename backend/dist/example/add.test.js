"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = require("./add");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('#add', () => {
    (0, vitest_1.it)('returns 5', () => {
        (0, vitest_1.expect)((0, add_1.add)(2, 3)).toBe(5);
    });
});
