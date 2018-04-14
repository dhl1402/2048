export const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

export const getDistinctRandomInt = (max, qty) => {
  const result = [];
  while (result.length < qty) {
    const randomInt = getRandomInt(max);
    if (result.indexOf(randomInt) === -1) {
      result.push(randomInt);
    }
  }
  return result;
};
