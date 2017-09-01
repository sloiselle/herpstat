//////////////////////////////////////////////////////////
//  WebPack Common (webpack.academy)
//////////////////////////////////////////////////////////
//  author: Jose Quinto - https://blog.josequinto.com
//////////////////////////////////////////////////////////

const commonPaths = require("./common-paths");
const config = {
    target: 'web',
    entry: {
        'bundle': './app/src/index.jsx'
    },
    entry: {
        polyfills: [
            'core-js/es6/set'
        ],
        bundle: './app/src/index.jsx'

    },
    output: {
        filename: 'static/js/[name].js',
        path: commonPaths.outputPath,

        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: 'static/js/[name].chunk.js',

        // This is the URL that app is served from. We use "/" in development.
        publicPath: '/'
    }
};

module.exports = config;
