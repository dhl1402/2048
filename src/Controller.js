import update from 'immutability-helper';

import { SIZE } from './constants';

const Controller = {
  moveUp(prev) {
    let blockState = prev;
    for (let i = 1; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (blockState[i][j] === 0) {
          continue;
        }

        if (blockState[i - 1][j] === blockState[i][j]) {
          // set [x-1,y] = 2 * [x,y] & set [x,y] = 0
          blockState = update(blockState, {
            [i]: { [j]: { $set: 0 } },
            [i - 1]: { [j]: { $set: blockState[i][j] * 2 } },
          });
        } else if (blockState[i - 1][j] === 0) {
          if (i === 1) {
            blockState = update(blockState, {
              [i]: { [j]: { $set: 0 } },
              0: { [j]: { $set: blockState[i][j] } },
            });
          }
          for (let k = i - 2; k >= 0; k--) {
            if (blockState[k][j] === blockState[i][j]) {
              blockState = update(blockState, {
                [i]: { [j]: { $set: 0 } },
                [k]: { [j]: { $set: blockState[i][j] * 2 } },
              });
              break;
            } else if (blockState[k][j] !== 0) {
              blockState = update(blockState, {
                [i]: { [j]: { $set: 0 } },
                [k + 1]: { [j]: { $set: blockState[i][j] } },
              });
              break;
            } else if (k === 0) {
              // newBlockValues[k][j] === 0 here
              blockState = update(blockState, {
                [i]: { [j]: { $set: 0 } },
                [k]: { [j]: { $set: blockState[i][j] } },
              });
              break;
            }
          }
        }
      }
    }
    return blockState;
  },
};

export default Controller;
