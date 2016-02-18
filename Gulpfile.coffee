gulp    = require("gulp")
gutil   = require("gulp-util")
coffee  = require("gulp-coffee")
concat  = require("gulp-concat")
include = require("gulp-include")
uglify  = require("gulp-uglify")
pkg     = require("./package.json")


browserify  = require("browserify")
watchify    = require("watchify")
coffeeify   = require("coffeeify")
debowerify  = require("debowerify")
hamlc       = require("gulp-haml-coffee-compile")
pathmodify  = require("pathmodify")
buffer      = require('vinyl-buffer')
source      = require("vinyl-source-stream")

gulp.task "coffee", ()->
  gulp.src(["./src/#{pkg.name}.coffee"])
    .pipe(include())
    .pipe(concat("#{pkg.name}.js"))
    .pipe(coffee({bare: true}).on("error", gutil.log))
    .pipe(gulp.dest("./lib/"))

gulp.task "minify", ()->
  gulp.src(["./lib/#{pkg.name}.js"])
    .pipe(uglify())
    .pipe(concat("#{pkg.name}.min.js"))
    .pipe(gulp.dest("./lib/"))

gulp.task "watchfiles", ()->
  gulp.watch("./src/**/**/**/*.coffee", ["coffee", "minify"])

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

gulp.task "default", ["coffee", "minify", "watchfiles"]
