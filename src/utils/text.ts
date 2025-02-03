export function isString(x: any) {
  return Object.prototype.toString.call(x) === "[object String]";
}

export const encodeUrl = (name: string) =>
  name?.replace(/&/g, "and").replace(/\s+/g, "-");

export const decodeUrl = (name: string) => name?.replace(/-/g, " ");
