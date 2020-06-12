const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = (env, argv) => {
    let publicPath = '/';
    if (argv.mode == 'production') {
        publicPath = '/tree_of_hopes/';
    }

    let config = {
        entry: {
            admin: ['babel-polyfill', './admin/index.js']
        },
        output: {
            filename: '[name]/build.[chunkhash].js',
            path: path.resolve(__dirname, '../dist'),
            publicPath: publicPath
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*']
            }),
            new HtmlWebpackPlugin({
                filename: 'admin/index.html',
                template: 'admin/index.html',
                chunks: ['admin'],
                chunksSortMode: "dependency"
            }),
            new DotEnv()
        ],

        module: {
            rules: [
                {
                    test: /\.js$/,
                    // exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    '@babel/preset-env'
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader'
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.sass$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader?indentedSyntax'
                    ],
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            'scss': [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader'
                            ],
                            'sass': [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader?indentedSyntax'
                            ]
                        }
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash].[ext]'
                    }
                },
                {
                    test: /\.(otf|eot|ttf|woff|woff2)(\?.+)?$/,
                    loader: 'url-loader'
                }
            ]
        }
    };

    return config;
};
