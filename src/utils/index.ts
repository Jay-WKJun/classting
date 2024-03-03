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
  const areaElement = document.createElement('textarea');
  areaElement.innerHTML = string;

  return areaElement.value;
}

export function isNumber(any: unknown): any is number {
  return typeof any === 'number';
}
