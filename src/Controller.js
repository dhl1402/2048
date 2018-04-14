import update from 'immutability-helper';

import { SIZE } from './constants';
import { getRandomInt } from './utils';

export const rotate90 = (blockState) => {
  const result = [];
  for (let i = 0; i < SIZE; i++) {
    result[i] = [];
    for (let j = 0; j < SIZE; j++) {
      result[i][j] = blockState[(SIZE - 1) - j][i];
    }
  }
  return result;
};

export const rotate180 = (blockState) => {
  const result = [];
  for (let i = 0; i < SIZE; i++) {
    result[i] = [];
    for (let j = 0; j < SIZE; j++) {
      result[i][j] = blockState[(SIZE - 1) - i][(SIZE - 1) - j];
    }
  }
  return result;
};

export const rotate270 = (blockState) => {
  const result = [];
  for (let i = 0; i < SIZE; i++) {
    result[i] = [];
    for (let j = 0; j < SIZE; j++) {
      result[i][j] = blockState[j][(SIZE - 1) - i];
    }
  }
  return result;
};

// main logic function
// can be reused for all arrow action
// just rotate the blockState then perform translate in one direction
export const slideUp = (blockState) => {
  let newBlockState = blockState;
  const mergedIndex = []; // list indexes has been merged in this action
  for (let i = 1; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (newBlockState[i][j] === 0) {
        continue;
      }

      if (newBlockState[i - 1][j] === newBlockState[i][j]) {
        newBlockState = update(newBlockState, {
          [i]: { [j]: { $set: 0 } },
          [i - 1]: { [j]: { $set: newBlockState[i][j] * 2 } },
        });
        mergedIndex.push(((i - 1) * SIZE) + j);
      } else if (newBlockState[i - 1][j] === 0) {
        if (i === 1) {
          newBlockState = update(newBlockState, {
            [i]: { [j]: { $set: 0 } },
            0: { [j]: { $set: newBlockState[i][j] } },
          });
        }
        for (let k = i - 2; k >= 0; k--) {
          const mergedAtThisIndex = mergedIndex.indexOf((k * SIZE) + j) !== -1;
          // check mergedAtThisIndex to perform mergin only one time
          if (newBlockState[k][j] === newBlockState[i][j] && !mergedAtThisIndex) {
            newBlockState = update(newBlockState, {
              [i]: { [j]: { $set: 0 } },
              [k]: { [j]: { $set: newBlockState[i][j] * 2 } },
            });
            mergedIndex.push((k * SIZE) + j);
            break;
          } else if (newBlockState[k][j] !== 0) {
            newBlockState = update(newBlockState, {
              [i]: { [j]: { $set: 0 } },
              [k + 1]: { [j]: { $set: newBlockState[i][j] } },
            });
            break;
          } else if (k === 0) {
            // newBlockValues[k][j] === 0 here
            newBlockState = update(newBlockState, {
              [i]: { [j]: { $set: 0 } },
              [k]: { [j]: { $set: newBlockState[i][j] } },
            });
            break;
          }
        }
      }
    }
  }
  return newBlockState;
};

const Controller = {
  moveUp(blockState) {
    return slideUp(blockState);
  },

  moveDown(blockState) {
    return rotate180(slideUp(rotate180(blockState)));
  },

  moveRight(blockState) {
    return rotate90(slideUp(rotate270(blockState)));
  },

  moveLeft(blockState) {
    return rotate270(slideUp(rotate90(blockState)));
  },

  addBlock(blockState, value) {
    const unsetIndex = [];
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (blockState[i][j] === 0) {
          unsetIndex.push({ row: i, col: j });
        }
      }
    }
    const randomIndex = unsetIndex[getRandomInt(unsetIndex.length - 1)];
    return update(blockState, {
      [randomIndex.row]: { [randomIndex.col]: { $set: value } },
    });
  },
};

export default Controller;
