import path from 'path';
import { fileURLToPath } from 'url';
import { VueLoaderPlugin } from 'vue-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'app/assets/dist'),
        filename: 'crud6-vue.bundle.js',
        library: {
            name: 'CRUD6Vue',
            type: 'umd'
        },
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
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                    compilerOptions: {
                        noEmit: false
                    }
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