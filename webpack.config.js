const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'app/assets/dist'),
        filename: 'crud6-vue.bundle.js',
        library: 'CRUD6Vue',
        libraryTarget: 'umd',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    externals: {
        'vue': 'vue',
        'vue-router': 'vue-router',
        'pinia': 'pinia',
        'axios': 'axios',
        '@userfrosting/sprinkle-core': '@userfrosting/sprinkle-core',
        '@userfrosting/theme-pink-cupcake': '@userfrosting/theme-pink-cupcake'
    }
};