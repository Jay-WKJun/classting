import he from 'he';

export function shuffle<T extends Array<unknown>>(arr: T): T[number][] {
  const newArr = [...arr];

  let currentIndex = newArr.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [newArr[currentIndex], newArr[randomIndex]] = [
      newArr[randomIndex],
      newArr[currentIndex],
    ];
  }

  return newArr;
}

export function decodeHtmlString(string: string) {
  return he.decode(string);
}

export function countMatchingElements<T>(
  arr: T[],
  callback: (el: T) => boolean,
): number {
  return arr.reduce((prev, curr) => {
    if (callback(curr)) return prev + 1;
    return prev;
  }, 0);
}

export function toNumber(param: unknown) {
  if (typeof param === 'number') return Number(param);
  return null;
}

export function getNextNumberInArray({
  arr,
  center,
  isSmall = false,
}: {
  arr: number[];
  center: number;
  isSmall: boolean;
}) {
  if (arr.length <= 0) return null;

  if (isSmall) {
    return arr.reduce((prev, curr) => {
      if (curr < center) return Math.max(prev, curr);
      return prev;
    }, center);
  }

  return arr.reduce((prev, curr) => {
    if (curr > center) return Math.min(prev, curr);
    return prev;
  }, center);
}
