// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 4, b: 2, action: Action.Multiply, expected: 8 },
    { a: 4, b: 2, action: Action.Exponentiate, expected: 16 }
    // continue cases for other actions    
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'correctly implemented %s operation',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    }
  );
});
