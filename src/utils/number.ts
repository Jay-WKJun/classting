export function toNumber(param: unknown) {
  if (param == null) return null;
  if (typeof param === 'string' && !param) return null;
  if (typeof param === 'object' && Object.keys(param).length === 0) return null;

  const numberedParam = Number(param);

  if (Number.isNaN(numberedParam)) return null;
  return numberedParam;
}
