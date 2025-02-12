module.exports = function override(config, env) {
  // Modify the output publicPath to make paths relative
  config.output.publicPath = './';

  // You can also override other configurations here if needed
  return config;
};
