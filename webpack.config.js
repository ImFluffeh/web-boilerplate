var path = require('path')
var Paths = require('./globalsettings').Paths
var lodash = require('lodash')
var uglify = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: path.resolve(Paths.Source, 'js/entry.js'),
    output: {
        filename: 'scripts.js',
        path: path.join(Paths.Build, 'js')
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
    }
}