gulp    = require("gulp")
gutil   = require("gulp-util")
coffee  = require("gulp-coffee")
concat  = require("gulp-concat")
include = require("gulp-include")
uglify  = require("gulp-uglify")
pkg     = require("./package.json")

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


gulp.task "default", ["coffee", "minify", "watchfiles"]
