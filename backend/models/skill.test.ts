import { describe, expect, it } from 'vitest';
import {
  isSameDay,
  checkSkill,
  updateRank,
  addStep,
  calculateDecay,
} from './skill.model';
import { Skill } from '../models/skill.model';

describe('#checking same days', () => {
  it('compares 2 dates that are now', () => {
    let date1 = new Date();
    let date2 = new Date();
    expect(isSameDay(date1, date2)).toBe(true);
  });
  it('compares now date with 2023-07-07', () => {
    let date1 = new Date();
    let date2 = new Date('2023-07-07');
    expect(isSameDay(date1, date2)).toBe(false);
  });
});

describe('#checking updateRank', () => {
  const skill = new Skill({ name: 'reading' });
  skill.skill_level = 120;
  it('updates rank to beginner 1', () => {
    updateRank(skill);

    expect(skill.rank.name).toBe('Beginner_1');
  });
  it('sets nextRank to beginner 2', () => {
    expect(skill.nextRank.name).toBe('Beginner_2');
  });

  it('updates rank to Master 5', () => {
    skill.skill_level = 1200000;
    updateRank(skill);
    expect(skill.rank.name).toBe('Master_5');
  });
  it('sets nextRank to Titan'),
    () => {
      expect(skill.nextRank.name).toBe('Titan');
    };
});

describe('#checking add step', () => {
  const skill = new Skill({ name: 'reading' });

  it('adds a 15 step', () => {
    addStep(skill, 15);
    expect([
      skill.steps.length,
      skill.total_time,
      skill.skill_level,
    ]).toStrictEqual([1, 15, 15.15]);
  });
  it('check streak multiplier', () => {
    skill.streak = 3;
    addStep(skill, 10);
    expect([
      skill.steps.length,
      skill.total_time,
      skill.skill_level,
    ]).toStrictEqual([2, 25, 25.45]);
  });
});

describe('checking skill decay', () => {
  it('decay 10000 by 1 day', () => {
    expect(calculateDecay(10000, 2)).toBe(100);
  });
  it('decay 10000 by 3 day', () => {
    expect(calculateDecay(10000, 4)).toBe(297.01);
  });

  it('checking max skill decay by 1 days', () => {
    expect(calculateDecay(200000, 2)).toBe(120);
  });
});

describe('#checking checkSkill', () => {
  const skill = new Skill({ name: 'reading' });
  let newDate = new Date();

  it('check skill level decay 1 day', () => {
    skill.skill_level = 100;
    addStep(skill, 0);

    skill.steps[0].date.setDate(newDate.getDate() - 1);
    checkSkill(skill);
    expect(skill.skill_level).toBe(99);
  });
  it('check skill level decay 2 days', () => {
    skill.skill_level = 100;

    skill.steps[0].date.setDate(newDate.getDate() - 2);
    checkSkill(skill);
    expect(skill.skill_level).toBe(98.01);
  });

  it('check max decay', () => {
    skill.skill_level = 20000;
    skill.steps[0].date.setDate(newDate.getDate() - 2);
    checkSkill(skill);
    expect(skill.skill_level).toBe(19760);
  });

  //   it('check skill is not under threshold', () => {
  //     updateRank(skill);
  //     skill.skill_level = 3000;
  //     checkSkill(skill);
  //     expect(skill.skill_level).toBe(18000);
  //   });
});
