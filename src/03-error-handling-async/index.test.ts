// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'content';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const value = 'Simple error message';
    expect(() => throwError(value)).toThrowError(value);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!')
  });
});

describe('throwCustomError', () => {
  const myError = new MyAwesomeError();
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(myError);
  });
});

describe('rejectCustomError', () => {
  const myError = new MyAwesomeError();
  test('should reject custom error', async () => {
    return await expect(() => rejectCustomError()).rejects.toThrow(myError);
  });
});
