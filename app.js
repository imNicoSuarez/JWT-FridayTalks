
/**
 * Module dependencies.
 */


var express   = require('express'),
    routes    = require('./routes'),
    api      = require('./routes/api'),
    http      = require('http'),
    path      = require('path'),
    bootstrap = require('bootstrap3-stylus'),
    stylus    = require('stylus');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(bootstrap());
}


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: compile
}));

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/api/auth', api.auth);
app.get('/api/user', api.getUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
