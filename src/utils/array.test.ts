import { shuffle, countMatchingElements, getNextNumberInArray } from './array';

describe('shuffle function', () => {
  test('shuffles the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffledArr = shuffle(arr);
    arr.forEach((item) => {
      expect(shuffledArr).toContain(item);
    });

    expect(Array.isArray(shuffledArr)).toBe(true);
    expect(shuffledArr).toHaveLength(arr.length);
    expect(shuffledArr).not.toEqual(arr);
  });
});

describe('countMatchingElements function', () => {
  test('returns 0 when given an empty array', () => {
    const arr: unknown[] = [];
    const callback = jest.fn();

    const count = countMatchingElements(arr, callback);

    expect(count).toBe(0);
    expect(callback).not.toHaveBeenCalled();
  });

  test('returns array length when all elements satisfy the condition', () => {
    const arr = [1, 2, 3, 4, 5];
    const callback = jest.fn((el) => el > 0);

    const count = countMatchingElements(arr, callback);

    expect(count).toBe(arr.length);
    expect(callback).toHaveBeenCalledTimes(arr.length);
  });

  test('returns 0 when none of the elements satisfy the condition', () => {
    const arr = [-1, -2, -3, -4, -5];
    const callback = jest.fn((el) => el > 0);

    const count = countMatchingElements(arr, callback);

    expect(count).toBe(0);
    expect(callback).toHaveBeenCalledTimes(arr.length);
  });

  test('returns correct count when only some elements satisfy the condition', () => {
    const arr = [1, -2, 3, -4, 5];
    const callback = jest.fn((el) => el > 0);

    const count = countMatchingElements(arr, callback);

    expect(count).toBe(3);
    expect(callback).toHaveBeenCalledTimes(arr.length);
  });

  test('returns correct count when elements are objects', () => {
    const arr = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Alice', age: 35 },
    ];
    const callback = jest.fn((el) => el.age > 25);

    const count = countMatchingElements(arr, callback);

    expect(count).toBe(2);
    expect(callback).toHaveBeenCalledTimes(arr.length);
  });
});

describe('getNextNumberInArray function', () => {
  it('should return null when the array is empty', () => {
    const result = getNextNumberInArray({ arr: [], center: 0, isSmall: false });
    expect(result).toBeNull();
  });

  it('should return the next smallest number when isSmall is true', () => {
    const result = getNextNumberInArray({
      arr: [1, 3, 5, 7, 9],
      center: 4,
      isSmall: true,
    });
    expect(result).toBe(3);
  });

  it('should return the next largest number when isSmall is false', () => {
    const result = getNextNumberInArray({
      arr: [1, 3, 5, 7, 9],
      center: 4,
      isSmall: false,
    });
    expect(result).toBe(5);
  });

  it('should return the next smallest number when isSmall is true even though center is one of element', () => {
    const result = getNextNumberInArray({
      arr: [1, 3, 5, 7, 9],
      center: 5,
      isSmall: true,
    });
    expect(result).toBe(3);
  });

  it('should return the next largest number when isSmall is false even though center is one of element', () => {
    const result = getNextNumberInArray({
      arr: [1, 3, 5, 7, 9],
      center: 5,
      isSmall: false,
    });
    expect(result).toBe(7);
  });

  it('should handle negative numbers correctly when isSmall is true', () => {
    const result = getNextNumberInArray({
      arr: [-9, -7, -5, -3, -1],
      center: -4,
      isSmall: true,
    });
    expect(result).toBe(-5);
  });

  it('should handle negative numbers correctly when isSmall is false', () => {
    const result = getNextNumberInArray({
      arr: [-9, -7, -5, -3, -1],
      center: -4,
      isSmall: false,
    });
    expect(result).toBe(-3);
  });

  it('should return center when there is no smaller number than center and isSmall is true', () => {
    const result = getNextNumberInArray({
      arr: [5, 7, 9],
      center: 4,
      isSmall: true,
    });
    expect(result).toBe(4);
  });

  it('should return center when there is no larger number than center and isSmall is false', () => {
    const result = getNextNumberInArray({
      arr: [1, 2, 3],
      center: 4,
      isSmall: false,
    });
    expect(result).toBe(4);
  });
});
