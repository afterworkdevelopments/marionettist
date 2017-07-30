# npm install -D gulp gulp-concat gulp-util gulp-uglify gulp-coffee gulp-rollup gulp-sourcemaps

gulp    = require("gulp")
gutil   = require("gulp-util")
runSequence   = require('run-sequence').use(gulp)
rollup         = require("rollup")
coffee         = require("rollup-plugin-coffee-script")
minify         = require('rollup-plugin-minify')
pkg            = require("./package.json")
packageName     = pkg.name

globals =
  'jquery': "$"
  'backbone': 'Backbone'
  'underscore': '_'
  'backbone-associations': 'Backbone'
  'backbone.radio': 'Backbone.Radio'
  'backbone.marionette': "Marionette"
  "marionette.toolkit": "Marionette.Toolkit"
  'i18next': "i18next"
  'numeral': "numeral"
  'moment': "moment"
  'moment-range': "moment"
  'moment-timezone': "moment"


gulp.task "dist", ->
  console.log "Dist"
  rollup.rollup(
    entry: "./src/#{packageName}.coffee"
    plugins: [ coffee() , minify({umd: "dist/#{packageName}.min.js"})]
    external: ['underscore', 'backbone', 'backbone-associations', 'backbone.radio', 'backbone.marionette','i18next','numeral','moment','moment-range', 'moment-timezone']
  ).then (bundle)->
    options =
      sourceMap: true
      moduleName: "Marionettist"
      format: "umd"
      exports: "default"
      dest: "dist/#{packageName}.js"
      globals: globals

    bundle.write options

gulp.task "bundle", ->
  console.log "Bundle"
  rollup.rollup(
    entry: "./src/#{packageName}.coffee"
    plugins: [ coffee() , minify({umd: "dist/#{packageName}.bundle.min.js"})]
    external: -> return false
  ).then (bundle)->
    options =
      sourceMap: true
      moduleName: "Marionettist"
      format: "umd"
      exports: "default"
      dest: "dist/#{packageName}.bundle.js"
      # globals: globals
    bundle.write options


gulp.task "watchfiles", ()->
  console.log "Watchfiles"
  return gulp.watch "./src/**/**/**/*.coffee" , (callback)->
    runSequence("dist")




gulp.task "default", (callback = ->)->
  runSequence('dist')
  # runSequence('bundle')
  runSequence("watchfiles")
