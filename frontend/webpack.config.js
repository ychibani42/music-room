/**
 * Webpack configuration for Expo Web
 * This allows proper environment variable handling in the web build
 */

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Customize the config before returning it.
  return config;
};
