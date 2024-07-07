import exp from 'constants';
import { add } from './add';
import { describe, expect, it } from 'vitest';

describe('#add', () => {
  it('returns 5', () => {
    expect(add(2, 3)).toBe(5);
  });
});
