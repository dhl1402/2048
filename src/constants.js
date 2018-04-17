export const SIZE = 4;
export const INIT_VALUES = [1024];
export const STARTING_BLOCK = 2;
export const BLOCK_STATUS = {
  NEW: 'new',
  UNTOUCHED: 'untouched',
  EMPTY: 'empty',
  MERGED: 'merged',
  MOVED: 'moved',
};
export const BLOCK_COLOR = {
  0: { backgroundColor: '#CDC1B6', color: '#766E65' },
  2: { backgroundColor: '#EEE4DC', color: '#766E65' },
  4: { backgroundColor: '#EDE0CA', color: '#766E65' },
  8: { backgroundColor: '#F0B181', color: '#F9F6F2' },
  16: { backgroundColor: '#F1956C', color: '#F9F6F2' },
  32: { backgroundColor: '#F27C67', color: '#F9F6F2' },
  64: { backgroundColor: '#F26049', color: '#F9F6F2' },
  128: { backgroundColor: '#EBCC7E', color: '#F9F6F2' },
  256: { backgroundColor: '#EBCA70', color: '#F9F6F2' },
  512: { backgroundColor: '#EBC663', color: '#F9F6F2' },
  1024: { backgroundColor: '#EBC357', color: '#F9F6F2' },
  2048: { backgroundColor: '#EEC54F', color: '#F9F6F2' },
};

