const gulp = require("gulp")
const ts = require("gulp-typescript")
const del = require("del")
const merge = require("merge2")
const sourcemaps = require("gulp-sourcemaps")
const less = require("gulp-less")
const concat = require("gulp-concat")
const options = {
    declaration: true
}
const tsProject = ts.createProject("tsconfig.json", options)

gulp.task("lib:ts", function () {
    del.sync("lib")
    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
    return merge(
        [
            tsResult.js
            .pipe(gulp.dest("lib"))
            .pipe(sourcemaps.write(".", {includeContent: false})),
            tsResult.js
            .pipe(concat("bb-editor.js"))
            .pipe(gulp.dest("dist"))
            .pipe(sourcemaps.write(".", {includeContent: false})),
            tsResult.dts.pipe(gulp.dest("lib"))
        ]
    )  
})

gulp.task("lib:less", function() {
    gulp.src(["src/**/*.less"])
    .pipe(less())
    .pipe(concat('bb-editor.css'))
    .pipe(gulp.dest("dist"))
})

gulp.task("default", gulp.series("lib:ts", "lib:less"))