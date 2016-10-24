var gulp         = require('gulp'),
    stylus       = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    sourcemaps   = require('gulp-sourcemaps'),
    gulpIf       = require('gulp-if'),
    spritesmith  = require('gulp.spritesmith'),
    svgstore     = require('gulp-svgstore'),
    svgmin       = require('gulp-svgmin'),
    path         = require('path'),
    uglify       = require('gulp-uglifyjs'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    notify       = require('gulp-notify'),
    cssnano      = require('gulp-cssnano'),
    jade         = require('gulp-jade'),
    browserSync  = require('browser-sync');
  
var isDevelopment = !process.env.NODE_ENV || process.env.Node_ENV == 'development';

gulp.task('styles', function () {
    return gulp.src('src/stylus/main.styl')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(stylus({
        paths:  ['src/stylus/blocks', 'src/css/'],
        'include css': true
    }))
    .on('error', notify.onError())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8']))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));    
});

gulp.task('scripts', function () {
    return gulp.src(['src/libs/*.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
})

gulp.task('jade', function() {
  gulp.src('src/template/index.jade')
    .pipe(jade())
    .on('error', notify.onError())
    .pipe(gulp.dest('src/'))
});

gulp.task('svgstore', function () {
    return gulp
        .src('src/images/icons/svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('src/images/icons/svg'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
  }));
  return spriteData.pipe(gulp.dest('src/images'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('clean', function () {
    return del.sync('build');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('img', function () {
    return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('build/images'));
})

gulp.task('watch',['browser-sync', 'jade','styles', 'scripts'], function () {
    gulp.watch('src/stylus/**/*.styl', ['styles']);
    gulp.watch('src/template/**/*.jade', ['jade'], browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean','styles', 'img', 'scripts'], function () {
    
    var buildCss = gulp.src('src/css/main.css')
      .pipe(cssnano())
      .pipe(gulp.dest('build/css'));
    
    var buildFonts = gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('build/fonts'));
    
    var buildJs = [(gulp.src('src/js/libs.min.js')
      .pipe(gulp.dest('build/js'))),
      (gulp.src('src/js/main.js')
      .pipe(uglify())
      .pipe(gulp.dest('build/js'))
      )];
            
    var buildHtml = gulp.src('src/*.html')
      .pipe(gulp.dest('build/'));
    
});