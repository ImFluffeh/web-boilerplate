var path = require('path')

// Configuration
var build =         __dirname + '/build'
var src =           __dirname + '/src'
var release =       __dirname + '/release'
var jsdir =         src + '/js'
var jsentry =       jsdir + '/entry.js'
var scssdir =       src + '/scss'
var scssentry =     scssdir + '/index.scss'
var scssincludes =  [scssdir + '/includes']





// Pretty external reading
module.exports = {
    Paths: {
        Build: build,
        Source: src,
        Release: release,
        JsDir: jsdir,
        JsEntry: jsentry,
        ScssDir: scssdir,
        ScssIncludes: scssincludes,
        ScssEntry: scssentry,
    }
}