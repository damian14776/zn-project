const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/],
                loader: 'builtin:swc-loader',
                options: {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                        },
                    },
                },
                type: 'javascript/auto',
            },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            type: 'javascript/auto',
        },
            {
                test: /\.svg$/, // Match SVG files
                type: 'asset', // Use Rspack's asset module
            },
    ],
},
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}