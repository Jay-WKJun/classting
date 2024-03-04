import he from 'he';

export function decodeHtmlString(string: string) {
  return he.decode(string);
}
