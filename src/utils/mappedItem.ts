const mappedItem = <T>(items: T[], columns: number): T[][] => {
  const size = Math.floor(items.length / columns);
  let count = 0;
  const newArray = [];
  while (count <= size) {
    newArray.push(items.slice(count * columns, (count + 1) * columns));
    count += 1;
  }
  return newArray;
};

export default mappedItem;
