const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts');
    config.resolve.extensions.push('.tsx');
    config.resolve.extensions.push('.json');

    config.resolve.plugins=[ new TsconfigPathsPlugin({
      configFile: `./tsconfig.json`,
      baseUrl: '.',
    })]
    return config;
  },
};