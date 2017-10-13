const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const spritesmith  = require('gulp.spritesmith');
const merge        = require('merge-stream');

const paths = {
  srcCSS: 'src/sass/**/*.scss',
  srcJS: 'src/**/*.js',
  srcImg: 'src/img/*.*',

  assetsCSS: 'assets/css/',
  assetsJS: 'assets/',
  assetsImg: 'assets/img'
};

gulp.task('img', function () {
  return gulp.src(paths.srcImg)
    .pipe(gulp.dest(paths.assetsImg));
});

gulp.task('sprite', function () {
  const spriteData = gulp.src('src/img/sprite/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: 'assets/img/sprite.png',
    }));
  
    const imgStream = spriteData.img
    .pipe(gulp.dest('assets/img/'));
 
    const cssStream = spriteData.css
    .pipe(gulp.dest('src/sass/'));

    return merge(imgStream, cssStream);
});


gulp.task('sass', function () {
  return gulp.src(paths.srcCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions','>1%','ie 9']))
    .pipe(gulp.dest(paths.assetsCSS));
});

gulp.task('watch', ['img', 'sass'], function(){
  gulp.watch(paths.srcCSS, ['sass']);
});

gulp.task('default', ['watch']);
