/**
 * Babel configuration for React Native
 * 
 * This file configures Babel to transpile modern JavaScript/React code
 * for compatibility with React Native's JavaScript engine.
 */

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
