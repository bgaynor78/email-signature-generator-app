const gulp = require('gulp');
const scp = require('gulp-scp2');
const webpack = require('gulp-webpack');
const runSequence = require('run-sequence');
const del = require('del');


//THE BELOW SEQUENCE IS USED TO CLEAN, BUILD AND DEPLOY
// THE PROJECT TO THE SERVER. NOT NEEDED FOR LOCAL DEVELOPMENT

gulp.task('build', function(callback) {
  runSequence('build-copy',
    'build-deploy',
    callback);
});

gulp.task('build-clean', function() {
  return del([
    'dist/**'
  ]).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('build-copy', function(){
  return gulp.src(['./scripts/pm2-prod.json','./package.json', './index.html', './app.js', './server.js'])
    .pipe(gulp.dest('./dist/'))
});

gulp.task('build-deploy', function() {
  return gulp.src('./dist/**')
    .pipe(scp({
      host:'ec2-52-15-196-180.us-east-2.compute.amazonaws.com',
      username: 'bgaynor',
      password: 'swe!RagefA4h',
      dest: '/home/bgaynor'
    }))
    .on('error', function(err) {
      console.log(err);
    });
});