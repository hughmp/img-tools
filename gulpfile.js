const gulp = require('gulp');
const watermark = require("gulp-watermark");
const imageResize = require('gulp-image-resize');

const sourcePath = './highlights/*.jpg';
const destPath = './watermarked/';

gulp.task('default',
  [
    'watermark-large',
    'watermark-medium',
    'watermark-small',
    'watermark-thumbnail',
  ]
);

gulp.task('watermark-fullsize', () => {
  return gulp
    .src(sourcePath)
    .pipe(watermark({
      image: "watermark.png",
      resize: '1200x1200',
      gravity: 'Center'
    }))
    .pipe(gulp.dest(`${destPath}fullsize`));
});

gulp.task('watermark-thumbnail', () => {
  return gulp
    .src(sourcePath)
    .pipe(imageResize({
      width: 200,
      height: 200,
      crop: false,
      upscale: false
    }))
    .pipe(watermark({
      image: "watermark.png",
      resize: '150x150',
      gravity: 'Center'
    }))
    .pipe(gulp.dest(`${destPath}thumbnails`));
});

gulp.task('watermark-small', () => {
  return gulp
    .src(sourcePath)
    .pipe(imageResize({
      width: 640,
      height: 640,
      crop: false,
      upscale: false
    }))
    .pipe(watermark({
      image: "watermark.png",
      resize: '300x300',
      gravity: 'Center'
    }))
    .pipe(gulp.dest(`${destPath}small`));
});

gulp.task('watermark-medium', () => {
  return gulp
    .src(sourcePath)
    .pipe(imageResize({
      width: 1024,
      height: 1024,
      crop: false,
      upscale: false
    }))
    .pipe(watermark({
      image: "watermark.png",
      resize: '500x500',
      gravity: 'Center'
    }))
    .pipe(gulp.dest(`${destPath}medium`));
});

gulp.task('watermark-large', () => {
  return gulp
    .src(sourcePath)
    .pipe(imageResize({
      width: 2048,
      height: 2048,
      crop: false,
      upscale: false
    }))
    .pipe(watermark({
      image: "watermark.png",
      resize: '1000x1000',
      gravity: 'Center'
    }))
    .pipe(gulp.dest(`${destPath}large`));
});