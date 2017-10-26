const webpack = require('webpack');

module.exports = {
    entry: {
        index: ['./src/index']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    target: "node",
    module: {
        rules: [{
                test: /\.ts$/,
                use: 'awesome-typescript-loader',
                exclude: __dirname + '/node_modules/'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                use: "tslint-loader",
                exclude: __dirname + '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};