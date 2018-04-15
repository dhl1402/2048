import 'jest';

import * as constants from './constants';
import { slideUp, rotate90, rotate180, rotate270 } from './Controller';

const { EMPTY, UNTOUCHED, MERGED, MOVED } = constants.BLOCK_STATUS;

// TODO: Fix tests

describe('Test rotate90', () => {
  constants.SIZE = 4;
  it('should rotate 90 degrees', () => {
    const blockValues = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(rotate90(blockValues)).toEqual([
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ]);
  });
});

describe('Test rotate180', () => {
  constants.SIZE = 4;
  it('should rotate 180 degrees', () => {
    const blockValues = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(rotate180(blockValues)).toEqual([
      [16, 15, 14, 13],
      [12, 11, 10, 9],
      [8, 7, 6, 5],
      [4, 3, 2, 1],
    ]);
  });
});

describe('Test rotate270', () => {
  constants.SIZE = 4;
  it('should rotate 270 degrees', () => {
    const blockValues = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(rotate270(blockValues)).toEqual([
      [4, 8, 12, 16],
      [3, 7, 11, 15],
      [2, 6, 10, 14],
      [1, 5, 9, 13],
    ]);
  });
});

describe('Test slideUp', () => {
  constants.SIZE = 4;
  it('should merge only one time #1', () => {
    const blockState = [
      [{ value: 2 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 2 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 4 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
    ];
    expect(slideUp(blockState)).toEqual([
      [{ value: 4, status: MERGED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
      [{ value: 4, status: MOVED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
      [{ value: 0, status: EMPTY }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
      [{ value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
    ]);
  });

  it('should merge only one time #2', () => {
    const blockState = [
      [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 2 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 2 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 4 }, { value: 0 }, { value: 0 }, { value: 0 }],
    ];
    expect(slideUp(blockState)).toEqual([
      [{ value: 4, status: MERGED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
      [{ value: 4, status: MOVED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
      [{ value: 0, status: EMPTY }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
      [{ value: 0, status: EMPTY }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
    ]);
  });

  it('should update merged index properly', () => {
    const blockState = [
      [{ value: 0 }, { value: 2 }, { value: 0 }, { value: 0 }],
      [{ value: 0 }, { value: 2 }, { value: 0 }, { value: 0 }],
      [{ value: 2 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 2 }, { value: 0 }, { value: 0 }, { value: 0 }],
    ];

    expect(slideUp(blockState)).toEqual([
      [{ value: 4, status: MERGED }, { value: 4, status: MERGED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
      [{ value: 0, status: UNTOUCHED }, { value: 0, status: EMPTY }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
      [{ value: 0, status: EMPTY }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
      [{ value: 0, status: EMPTY }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }, { value: 0, status: UNTOUCHED }],
    ]);
  });
});
