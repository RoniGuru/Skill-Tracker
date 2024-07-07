"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const skill_model_1 = require("./skill.model");
const skill_model_2 = require("../models/skill.model");
(0, vitest_1.describe)('#checking same days', () => {
    (0, vitest_1.it)('compares 2 dates that are now', () => {
        let date1 = new Date();
        let date2 = new Date();
        (0, vitest_1.expect)((0, skill_model_1.isSameDay)(date1, date2)).toBe(true);
    });
    (0, vitest_1.it)('compares now date with 2023-07-07', () => {
        let date1 = new Date();
        let date2 = new Date('2023-07-07');
        (0, vitest_1.expect)((0, skill_model_1.isSameDay)(date1, date2)).toBe(false);
    });
});
(0, vitest_1.describe)('#checking updateRank', () => {
    const skill = new skill_model_2.Skill({ name: 'reading' });
    skill.skill_level = 120;
    (0, vitest_1.it)('updates rank to beginner 1', () => {
        (0, skill_model_1.updateRank)(skill);
        (0, vitest_1.expect)(skill.rank.name).toBe('Beginner_1');
    });
    (0, vitest_1.it)('sets nextRank to beginner 2', () => {
        (0, vitest_1.expect)(skill.nextRank.name).toBe('Beginner_2');
    });
    (0, vitest_1.it)('updates rank to Master 5', () => {
        skill.skill_level = 1200000;
        (0, skill_model_1.updateRank)(skill);
        (0, vitest_1.expect)(skill.rank.name).toBe('Master_5');
    });
    (0, vitest_1.it)('sets nextRank to Titan'),
        () => {
            (0, vitest_1.expect)(skill.nextRank.name).toBe('Titan');
        };
});
(0, vitest_1.describe)('#checking add step', () => {
    const skill = new skill_model_2.Skill({ name: 'reading' });
    (0, vitest_1.it)('adds a 15 step', () => {
        (0, skill_model_1.addStep)(skill, 15);
        (0, vitest_1.expect)([
            skill.steps.length,
            skill.total_time,
            skill.skill_level,
        ]).toStrictEqual([1, 15, 15.15]);
    });
    (0, vitest_1.it)('check streak multiplier', () => {
        skill.streak = 3;
        (0, skill_model_1.addStep)(skill, 10);
        (0, vitest_1.expect)([
            skill.steps.length,
            skill.total_time,
            skill.skill_level,
        ]).toStrictEqual([2, 25, 25.45]);
    });
});
(0, vitest_1.describe)('checking skill decay', () => {
    (0, vitest_1.it)('decay 10000 by 1 day', () => {
        (0, vitest_1.expect)((0, skill_model_1.calculateDecay)(10000, 2)).toBe(100);
    });
    (0, vitest_1.it)('decay 10000 by 3 day', () => {
        (0, vitest_1.expect)((0, skill_model_1.calculateDecay)(10000, 4)).toBe(297.01);
    });
    (0, vitest_1.it)('checking max skill decay by 1 days', () => {
        (0, vitest_1.expect)((0, skill_model_1.calculateDecay)(200000, 2)).toBe(120);
    });
});
(0, vitest_1.describe)('#checking checkSkill', () => {
    const skill = new skill_model_2.Skill({ name: 'reading' });
    let newDate = new Date();
    (0, vitest_1.it)('check skill level decay 1 day', () => {
        skill.skill_level = 100;
        (0, skill_model_1.addStep)(skill, 0);
        skill.steps[0].date.setDate(newDate.getDate() - 1);
        (0, skill_model_1.checkSkill)(skill);
        (0, vitest_1.expect)(skill.skill_level).toBe(99);
    });
    (0, vitest_1.it)('check skill level decay 2 days', () => {
        skill.skill_level = 100;
        skill.steps[0].date.setDate(newDate.getDate() - 2);
        (0, skill_model_1.checkSkill)(skill);
        (0, vitest_1.expect)(skill.skill_level).toBe(98.01);
    });
    (0, vitest_1.it)('check max decay', () => {
        skill.skill_level = 20000;
        skill.steps[0].date.setDate(newDate.getDate() - 2);
        (0, skill_model_1.checkSkill)(skill);
        (0, vitest_1.expect)(skill.skill_level).toBe(19760);
    });
    //   it('check skill is not under threshold', () => {
    //     updateRank(skill);
    //     skill.skill_level = 3000;
    //     checkSkill(skill);
    //     expect(skill.skill_level).toBe(18000);
    //   });
});
