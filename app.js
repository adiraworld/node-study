var express = require('express');
var app = express();
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers');
var log = require('./middleware/log');
var partials = require('express-partials');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var csrf = require('csurf');
var util = require('./middleware/utilities')
var flash = require('connect-flash');

app.set('view engine','ejs');
app.set('view options',{defaultLayout: 'layout'});


app.use(partials());
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new RedisStore(
        {url: 'redis://localhost'})
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.use(function(req,res,next){
    if(req.session.pageCount)
        req.session.pageCount++;
    else
        req.session.pageCount = 1;
    next();
});
app.use(flash());

app.get('/error', function(req,res,next){
    next(new Error('A contrived error'));
});
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/logout', routes.logOut);
app.get('/chat', [util.requireAuthenticated], routes.chat);

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

/*
app.get('*', function(req, res){
    res.send('Express Response');
});
*/

app.listen(3000);
console.log("App server running on port 3000");