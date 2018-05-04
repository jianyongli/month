var gulp = require('gulp');
var server = require('gulp-webserver');
var data = require('./src/data/data.json');
var dataDetail = require('./src/data/detail.json');
var url = require('url')

gulp.task('default', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (/\/api\/index/g.test(req.url)) {
                    res.end(JSON.stringify(data));
                } else if (/\/api\/detail/g.test(req.url)) {
                    var id = url.parse(req.url, true).query.id;
                    res.end(JSON.stringify(dataDetail));
                }
                next();
            }
        }))
})