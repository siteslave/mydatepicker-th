
module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
                exclude: [/npmdist/]
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: "to-string-loader!css-loader"
            }
        ],
        postLoaders: [
            {
                test: /\.ts$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    'sampleapp',
                    'node_modules',
                    'npmdist',
                    /\.spec\.ts$/
                ]
            }
        ]
    }
};