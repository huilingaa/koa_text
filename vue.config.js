const fs = require('fs'),
    path = require('path'),
    IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV), // 环境变量
    CompressionPlugin = require("compression-webpack-plugin"), //Gzip
    zopfli = require("@gfx/zopfli"),
    BrotliPlugin = require("brotli-webpack-plugin"),
    productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

// 移除 console 和注释
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    publicPath: './',
    productionSourceMap: false,

    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src')) // 自定义目录别名
        config.optimization.splitChunks({
            // 分割代码
            chunks: 'all'
        })

        // 关闭体积显示
        config.performance
            .hints('warning')
            .maxAssetSize(30000000)
            .maxEntrypointSize(50000000)
            .assetFilter(function (assetFilename) {
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
            })

        // 引用 pug
        config.module
            .rule('pug')
            .test(/\.pug$/)
            .use('pug-plain-loader')
            .loader('pug-plain-loader')
            .end()

        // svg
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/svg'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/svg'))
            .end()
            .use('svg-sprite-loader') // 可以将多个svg打包成svg-spite
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },

    configureWebpack: config => {
        config.externals = {
            // cdn 加速
            vue: 'Vue',
            moment: 'moment',
            vuex: 'Vuex',
            'vue-router': 'VueRouter',
            axios: 'axios',
            'js-cookie': 'Cookies',
            'ant-design-vue': 'antd',
            lodash: '_',
        }
        if (IS_PROD) {
            const plugins = [];
            //     // 移除开发遗留注释
            plugins.push(
                new TerserPlugin({
                    terserOptions: {
                        comments: false, // 移除注释
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log'] // 移除 console
                        }
                    },
                    sourceMap: true,
                    parallel: true
                })
            )
            // Gzip压缩项目
            plugins.push(
                new CompressionPlugin({
                    algorithm(input, compressionOptions, callback) {
                        return zopfli.gzip(input, compressionOptions, callback);
                    },
                    compressionOptions: {
                        numiterations: 15
                    },
                    minRatio: 0.99,
                    test: productionGzipExtensions
                })
            );
            plugins.push(
                new BrotliPlugin({
                    test: productionGzipExtensions,
                    minRatio: 0.99
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
            // 去除map包
            config.devtool = false;
        }
    },

    css: {
        loaderOptions: {
            sass: {
                // 向全局sass样式传入共享的全局变量
                data: `@import "@/assets/css/variable.scss";
               @import "@/assets/css/global.scss";`
            }
        }
    }
}
