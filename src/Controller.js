import update from 'immutability-helper';

import { SIZE, INIT_VALUES, STARTING_BLOCK, BLOCK_STATUS } from './constants';
import { getRandomInt, getDistinctRandomInt } from './utils';

const { NEW, UNTOUCHED, EMPTY, MOVED, MERGED } = BLOCK_STATUS;

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
export const slide = (blockState, direction) => {
  // TODO: Improve this (just KISS)
  // clone and reset status of block state
  const newBlockState = blockState.map(row => row.map(block => ({ value: block.value, status: UNTOUCHED })));
  for (let i = 1; i < SIZE; i++) { // loop from second row
    for (let j = 0; j < SIZE; j++) {
      if (newBlockState[i][j].value === 0) {
        continue;
      }

      if (newBlockState[i - 1][j].value === newBlockState[i][j].value) {
        newBlockState[i - 1][j] = { value: newBlockState[i][j].value * 2, status: MERGED, meta: { distance: 1, direction } };
        newBlockState[i][j] = { value: 0, status: EMPTY };
      } else if (newBlockState[i - 1][j].value === 0) {
        if (i === 1) {
          newBlockState[0][j] = { value: newBlockState[i][j].value, status: MOVED, meta: { distance: 1, direction } };
          newBlockState[i][j] = { value: 0, status: EMPTY };
        }
        for (let k = i - 2; k >= 0; k--) {
          const mergedAtThisIndex = newBlockState[k][j].status === MERGED;
          // check mergedAtThisIndex to perform merging only one time
          if (newBlockState[k][j].value === newBlockState[i][j].value && !mergedAtThisIndex) {
            newBlockState[k][j] = { value: newBlockState[i][j].value * 2, status: MERGED, meta: { distance: i - k, direction } };
            newBlockState[i][j] = { value: 0, status: EMPTY };
            break;
          } else if (newBlockState[k][j].value !== 0) {
            newBlockState[k + 1][j] = { value: newBlockState[i][j].value, status: MOVED, meta: { distance: i - (k + 1), direction } };
            newBlockState[i][j] = { value: 0, status: EMPTY };
            break;
          } else if (k === 0) {
            // newBlockState[k][j] === 0 here
            newBlockState[k][j] = { value: newBlockState[i][j].value, status: MOVED, meta: { distance: i, direction } };
            newBlockState[i][j] = { value: 0, status: EMPTY };
            break;
          }
        }
      }
    }
  }
  return newBlockState;
};

const Controller = {
  initGame() {
    const blockState = [];
    const randomIndex = getDistinctRandomInt(SIZE * SIZE, STARTING_BLOCK);
    for (let i = 0; i < SIZE; i++) {
      blockState[i] = [];
      for (let j = 0; j < SIZE; j++) {
        const currIndex = (i * SIZE) + j;
        if (randomIndex.indexOf(currIndex) !== -1) {
          blockState[i][j] = {
            value: INIT_VALUES[getRandomInt(INIT_VALUES.length)],
            status: NEW,
          };
        } else {
          blockState[i][j] = {
            value: 0,
            status: UNTOUCHED,
          };
        }
      }
    }
    return blockState;
  },

  moveUp(blockState) {
    return slide(blockState, 'up');
  },

  moveDown(blockState) {
    return rotate180(slide(rotate180(blockState), 'down'));
  },

  moveRight(blockState) {
    return rotate90(slide(rotate270(blockState), 'right'));
  },

  moveLeft(blockState) {
    return rotate270(slide(rotate90(blockState), 'left'));
  },

  addBlock(blockState, value) {
    const emptyIndex = [];
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (blockState[i][j].value === 0) {
          emptyIndex.push({ row: i, col: j });
        }
      }
    }
    const randomIndex = emptyIndex[getRandomInt(emptyIndex.length - 1)];
    return update(blockState, {
      [randomIndex.row]: { [randomIndex.col]: { $set: { value, status: NEW } } },
    });
  },
};

export default Controller;
