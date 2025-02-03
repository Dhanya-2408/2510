export function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

export function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

export const safeSetTimeout = <F extends (...args: any[]) => any>(
  callback: F,
  timeout?: number,
  ...args: Parameters<F>
) => {
  return setTimeout(callback, timeout, ...args);
};

export const safeSetInterval = <F extends (...args: any[]) => any>(
  callback: F,
  timeout?: number,
  ...args: Parameters<F>
) => {
  return setInterval(callback, timeout, ...args);
};

const getValue = (value: any) =>
  typeof value === "string" ? value.toUpperCase() : value;

/**
 * Find an objects (one level-depth) with multiple criteria.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Object}
 */
export function findArrayItems<T, K extends keyof T>(
  array: Array<T>,
  filters: {
    [Property in keyof T]?: T[K];
  }
): T | undefined {
  const filterKeys = Object.keys(filters) as Array<K>;
  return array.find((item: T) => {
    return filterKeys.every((key) => {
      if (!filters[key]) return true;
      return getValue(filters[key]) === getValue(item[key]);
    });
  });
}

export function filterFalsyObject<T extends object, K extends keyof T>(obj: T) {
  const objectKeys = Object.keys(obj) as Array<K>;
  const newObj = {} as any;
  objectKeys.forEach((key: K) => {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

/**
 * Groups all items in an array of objects `T` where the value of property `K` is the same
 * @param array Items to group
 * @param key Key of `T` to group by
 */
export function GroupByPropValue<T, K extends keyof T>(array: T[], key: K) {
  let map = new Map<T[K], T[]>();
  array.forEach((item) => {
    let itemKey = item[key];
    if (!map.has(itemKey)) {
      map.set(
        itemKey,
        array.filter((i) => i[key] === item[key])
      );
    }
  });
  return map;
}

/**
 * Filters an array of objects (one level-depth) with multiple criteria.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
export function filterItems<T, K extends keyof T>(
  array: Array<T>,
  filters: {
    [Property in keyof T]?: string | null;
  }
): Array<T> {
  const filterKeys = Object.keys(filters) as Array<K>;
  return array.filter((item: T) => {
    return filterKeys.every((key) => {
      if (!filters[key]) return true;
      return getValue(filters[key]) === getValue(item[key]);
    });
  });
}
