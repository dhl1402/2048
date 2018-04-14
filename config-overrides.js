const { injectBabelPlugin } = require('react-app-rewired');

/* eslint-disable no-param-reassign */
module.exports = function override(config, env) {
  config = injectBabelPlugin(['styled-jsx/babel'], config);
  return config;
};
