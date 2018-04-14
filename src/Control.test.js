import 'jest';

import Controller from './Controller';

describe('Test Controller.moveUp', () => {
  it('case1', () => {
    const blockState = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    expect(Controller.moveUp(blockState)).toEqual([
      [4, 0, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });
});
