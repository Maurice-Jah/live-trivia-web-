const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

const browserSync = require("browser-sync").create();

//compile scss into css
function style() {
  // locate sass
  return (
    gulp
      .src("./scss/**/*.scss")
      .pipe(sass().on("error", sass.logError))

      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 5 versions"],
          // cascade: false,
        })
      )
      // compile to
      .pipe(gulp.dest("./css"))
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(gulp.dest("./css/min"))

      // 4. stream changes to all browser
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}
exports.style = style;
exports.watch = watch;
