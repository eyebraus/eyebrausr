
/**
* Module dependencies.
*/

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , stylus = require('stylus')
    , nib = require('nib');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    //app.set('views', __dirname + '/views');
    app.set('views', __dirname + '/mockups');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(stylus.middleware({
        src: path.join(__dirname, 'public'),
        compile: function(str, path) {
            return stylus(str)
                .set('filename', path)
                .use(nib());
        }
    }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', function(req, res) {
    res.render('index', {
        nav: {
            site: {
                home: 'home',
                about: 'about',
                resume: '/resume',
                projects: 'projects',
                blog: 'blog'
            },

            footer: {
                twitter: 'https://twitter.com/eyebraus',
                gplus: 'https://plus.google.com/u/0/+SeanBrennanCodes',
                linkedin: 'https://www.linkedin.com/profile/view?id=165852416',
                email: 'mailto:whalesonstilts2012@gmail.com'
            }
        }
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
