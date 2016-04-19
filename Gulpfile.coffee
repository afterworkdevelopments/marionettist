# npm install -D gulp gulp-concat gulp-util gulp-uglify gulp-coffee gulp-rollup gulp-sourcemaps

gulp    = require("gulp")
gutil   = require("gulp-util")
coffee  = require("gulp-coffee")
concat  = require("gulp-concat")
include = require("gulp-include")
uglify  = require("gulp-uglify")
runSequence   = require('run-sequence').use(gulp)
rollup         = require("gulp-rollup")
sourcemaps     = require("gulp-sourcemaps")
pkg            = require("./package.json")
pagakeName     = pkg.name

browserify  = require("browserify")
watchify    = require("watchify")
coffeeify   = require("coffeeify")
debowerify  = require("debowerify")
hamlc       = require("gulp-haml-coffee-compile")
pathmodify  = require("pathmodify")
buffer      = require('vinyl-buffer')
source      = require("vinyl-source-stream")
hamlc       = require("gulp-haml-coffee-compile")

gulp.task "hamlc", ()->
  options =
    compile:
      includePath: true
      pathRelativeTo: "./site/src"
  gulp.src("./site/**/**/**/**/*.hamlc")
    .pipe(hamlc(options).on("error", gutil.log))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./site/www/js"))

gulp.task "bundle", ->
  console.log "Bundle"
  return gulp.src("./lib/#{pagakeName}.js", read: false).pipe(rollup(
    sourceMap: true
    moduleName: "Marionettist"
    format: "umd"
    exports: "default"
    external: ['underscore', 'backbone', 'backbone.babysitter', 'backbone.radio', 'backbone.marionette','i18next','numeral','moment']
    plugins: []
    globals:
      'jquery': "$"
      'backbone': 'Backbone'
      'underscore': '_'
      'backbone.babysitter': 'Backbone.ChildViewContainer'
      'backbone.radio': 'Backbone.Radio'
      'Marionette': "Marionette"
      'i18next': "i18next"
      'numeral': "numeral"
      'moment': "moment"

  ))
  .pipe(sourcemaps.write("."))
  .pipe gulp.dest("./dist")



gulp.task "minify", ()->
  console.log "Minify"
  return gulp.src(["./dist/#{pagakeName}.js"])
    .pipe(uglify())
    .pipe(concat("#{pagakeName}.min.js"))
    .pipe(gulp.dest("./dist"))


gulp.task "coffee", ()->
  console.log "Coffee"
  return gulp.src(["./src/**/**/**/**/*.coffee"])
    .pipe(coffee({bare: true}).on("error", gutil.log))
    .pipe(gulp.dest("./lib"))

gulp.task "watchfiles", ()->
  console.log "Watchfiles"
  return gulp.watch "./src/**/**/**/*.coffee" , (callback)->
    runSequence("coffee",'bundle', "minify", callback)

gulp.task "site", ()->
  options=
    entries:    "./site/src/index.coffee"
    extensions: [".coffee",".css", ".hamlc"]
    debug: true
    paths: ['./node_modules','./site/src']
  b = watchify(browserify(options)).on("error", gutil.log)
  b.plugin(pathmodify(), {mods: [
    pathmodify.mod.dir("marionettist-site", "./site/src")
  ]})
  b.transform(coffeeify)
  b.transform(debowerify)
  bundle = ()->
    b.bundle()
    .on("error", gutil.log)
    .pipe(source("js/application.js"))
    .pipe(buffer())

    .pipe(gulp.dest("./site/www"))

  b.on("update", bundle)
  b.on("log", gutil.log)
  bundle()
  gulp.start("hamlc")

gulp.task "default", (callback)->
  runSequence("coffee",'bundle', "minify", "watchfiles", callback)
