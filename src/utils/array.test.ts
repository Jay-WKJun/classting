import { shuffle, countMatchingElements } from './array';

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
