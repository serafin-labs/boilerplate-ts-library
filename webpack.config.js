const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

// Webpack dev server doesn't support multiconfiguration. We need to detect it to use only the webapp configuration.
const isWebpackDevServer = process.env.MODE === "wds"

// detect production/development mode
const options = {
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.BUILD_TYPE === "test"
};

module.exports = function (env, argv) {
    const isProduction = !(argv.mode === "development")
    console.log(`Building for production:${isProduction} test:${options.isTest}`);

    var configurations = [{
        entry: (options.isTest) ? { "test": "./src/test/tests.ts" } : { "index": "./src/index.ts" },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        target: "node",
        externals: [nodeExternals()],
        devtool: 'nosources-source-map',
        watchOptions: {
            poll: 1000,
            ignored: /node_modules|lib/
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: (options.isTest) ? 'tsconfig.test.json' : 'tsconfig.json'
                        }
                    },
                    exclude: /node_modules/,
                }
            ]
        },
        optimization: {
            minimize: false
        },
        output: {
            filename: '[name].js',
            libraryTarget: 'commonjs',
            devtoolModuleFilenameTemplate: info => info.resourcePath.startsWith('./src') ? `.${info.resourcePath}` : info.absoluteResourcePath,
            path: path.resolve(__dirname, 'lib')
        },
        plugins: [
            ...(options.isTest && !options.isProduction ? [new WebpackShellPlugin({ onBuildExit: ['npm test'] })] : []),
            ...(!options.isTest && options.isProduction ? [new CleanWebpackPlugin(["lib"])] : []),
        ]
    }]

    return isWebpackDevServer ? configurations[0] : configurations
}