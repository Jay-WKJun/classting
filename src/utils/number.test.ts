import { toNumber } from './number';

describe('toNumber function', () => {
  it('should convert a valid number string to a number', () => {
    expect(toNumber('42')).toBe(42);
  });

  it('should convert a valid number string with leading/trailing spaces to a number', () => {
    expect(toNumber('  42  ')).toBe(42);
  });

  it('should convert a valid number string with leading zeros to a number', () => {
    expect(toNumber('007')).toBe(7); // Leading zeros are ignored
  });

  it('should convert a valid negative number string to a number', () => {
    expect(toNumber('-42')).toBe(-42);
  });

  it('should convert a valid floating point number string to a number', () => {
    expect(toNumber('3.14')).toBe(3.14);
  });

  it('should convert a valid exponential notation string to a number', () => {
    expect(toNumber('2e3')).toBe(2000);
  });

  it('should return null when the parameter is an empty string', () => {
    expect(toNumber('')).toBe(null);
  });

  it('should return null when the parameter is a non-numeric string', () => {
    expect(toNumber('abc')).toBe(null);
  });

  it('should return null when the parameter is null', () => {
    expect(toNumber(null)).toBe(null);
  });

  it('should return null when the parameter is undefined', () => {
    expect(toNumber(undefined)).toBe(null);
  });

  it('should return null when the parameter is NaN', () => {
    expect(toNumber(NaN)).toBe(null);
  });

  it('should return null when the parameter is an object', () => {
    expect(toNumber({})).toBe(null);
  });

  it('should return null when the parameter is an array', () => {
    expect(toNumber([])).toBe(null);
  });
});
