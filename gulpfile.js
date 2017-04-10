var gulp = require('gulp')
var path = require('path')
var scss = require('gulp-sass')
var clean = require('gulp-clean-css')
var webstream = require('webpack-stream')
var webpack = require('webpack')
var uglify = require('gulp-uglify')
var pump = require('pump')
var rimraf = require('rimraf')
var ncp = require('ncp').ncp
var fs = require('fs')

var config = require('./config')
var Paths = config.Globals.Paths

var ReqDirs = [
    {
        node:__dirname + '/node_modules/foundation-sites/dist',
        out: Paths.Release + '/foundation'
    },
    {
        node: __dirname + '/node_modules/jquery/dist',
        out: Paths.Release + "/jquery"
    }
]

gulp.task('default', ['build'])


gulp.task('build', ['build-js', 'build-scss'])

gulp.task('build-js', () => {
    return gulp.src(Paths.JsEntry)
                .pipe(
                    webstream(config.Webpack, webpack)
                ).pipe(
                    gulp.dest(path.join(Paths.Build, 'js'))
                )
})

gulp.task('build-scss', () => {
    return gulp.src(Paths.ScssEntry)
                .pipe(
                    scss({
                        includePaths: Paths.ScssIncludes,
                    })
                ).pipe(
                    gulp.dest(path.join(Paths.Build, 'css'))
                )
})

gulp.task('compress-js', ['build-js'], () => {
    pump([
        gulp.src(path.join(Paths.Build, 'js/scripts.js')),
        uglify(),
        gulp.dest(path.join(Paths.Release, 'js'))
    ])
})

gulp.task('compress-css', ['build-scss'], () => {
    return gulp.src(path.join(Paths.Build, 'css/index.css'))
                .pipe(
                    clean(undefined, (details) => {
                        console.log(details.name + ': ' + details.stats.originalSize)
                        console.log(details.name + ': ' + details.stats.minifiedSize)
                    })
                ).pipe(
                    gulp.dest(path.join(Paths.Release, 'css'))
                )
})

gulp.task('makedirs', () => {
    for(var k in ReqDirs) {
        if(ReqDirs[k].node == undefined || ReqDirs[k].out == undefined) {
            throw "Invalid format of Required Directory. Requires field 'node' and 'out'"
        }
        fs.mkdirSync(ReqDirs[k].out)
    }
})


gulp.task('clean', () => {
    rimraf(Paths.Build, errCall)
    rimraf(Paths.Release, errCall)
})


gulp.task('release', ['compress-js', 'compress-css', 'makedirs'], () => {
    for(var k in ReqDirs) {
        ncp(ReqDirs[k].node, ReqDirs[k].out, errCall)
    }
})


// Also returns 'was there an error'
function errCall(err) {
    if(err != undefined) {
        console.log(err)
        return true
    }
    return false
}