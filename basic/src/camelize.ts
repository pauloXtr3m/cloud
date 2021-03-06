export const camelize = (
  name: string,
  firstUpper: boolean = false,
  separator: string = '_',
): string => {
  if (firstUpper) {
    return name
      .split(separator)
      .map(w => w.toLowerCase().replace(/./, m => m.toUpperCase()))
      .join('');
  }
  return name
    .split(separator)
    .map((w, i) => {
      if (i > 0) {
        return w.toLowerCase().replace(/./, m => m.toUpperCase());
      }
      return w.toLowerCase();
    })
    .join('');
};
