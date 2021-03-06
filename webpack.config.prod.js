const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        library: 'CustomComponents',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    },
    externals: {
        react: 'umd react',
       'react-dom': 'umd react-dom',
     },
});
