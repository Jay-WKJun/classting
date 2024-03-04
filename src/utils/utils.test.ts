import { shuffle, decodeHtmlString, countMatchingElements } from './index';

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

describe('decodeHtmlString function', () => {
  test('decodes HTML entities with special characters', () => {
    const htmlString =
      '&lt;p&gt;This is a p tag with &quot;quotes&quot;&lt;/p&gt;';
    const decodedString = decodeHtmlString(htmlString);

    expect(decodedString).toEqual('<p>This is a p tag with "quotes"</p>');
  });

  test('returns an empty string if input is empty', () => {
    const emptyString = '';
    const decodedString = decodeHtmlString(emptyString);

    expect(decodedString).toEqual('');
  });

  test('decodes every HTML special characters', () => {
    const htmlString =
      '&lt;tag&gt; &quot;quotes&quot; &amp;amp&amp; &apos;apos&apos; &lt;/tag&gt;';
    const decodedString = decodeHtmlString(htmlString);

    expect(decodedString).toEqual(`<tag> "quotes" &amp& 'apos' </tag>`);
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
