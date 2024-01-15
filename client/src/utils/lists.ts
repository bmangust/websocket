/**
 * inserts or replaces item in list. Array must be sorted, function does not check it
 * @param item T to insert
 * @param list sorted array T[]
 * @returns new array T[]
 */
export const insertOneItemInList = <T extends { id: number }>(
  item: T,
  list: T[]
): T[] => {
  console.log(item);
  if (!item || item.id === undefined) return [...list];
  // optimize, if none of items is bigger then new onen
  if (list[list.length - 1]?.id < item.id) {
    return [...list, item];
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === item.id) {
      // return [...list];
      return [...list.slice(0, i), item, ...list.slice(i + 1)];
    } else if (list[i].id > item.id) {
      // list.splice(i-1,0,item);
      return [...list.slice(0, i), item, ...list.slice(i)];
    }
  }
  return [...list, item];
};

/**
 * inserts or replaces items in list. Second array must be sorted, function does not check it
 * @param items array T[] to insert
 * @param list sorted target array T[]
 * @returns new array T[]
 */
export const insertManyItemsInList = <T extends { id: number }>(
  items: T[],
  list: T[]
): T[] => {
  if (!items) return [...list];
  let newArray = [...list];
  for (const item of items) {
    newArray = insertOneItemInList(item, newArray);
  }
  return [...newArray];
};
