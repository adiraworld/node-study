module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.logOut = logOut;
module.exports.chat = chat;
var util = require('../middleware/utilities');

function index(req, res){
	res.render('index',{title: 'Index title'});
	/*
	res.cookie('IndexCookie','This was set from Index');
	res.render('index',{title: 'Index title', 
	cookie: JSON.stringify(req.cookies), 
	session: JSON.stringify(req.session),
	signedCookie: JSON.stringify(req.signedCookies)});
	*/
};

function login(req, res){
	res.render('login',{title: 'Login', message: req.flash('error')});
};

function loginProcess(req, res){
	var isAuth = util.auth(req.body.username, req.body.password, req.session);
	if(isAuth){
		res.redirect('/chat');
	} else {
		req.flash('error', '잘못된 유저이름 또는 비밀번호 입력');
		res.redirect('/login');
	}
};

function logOut(req, res){
	console.log("logOut")
	util.logOut(req.session);
	res.redirect('/');
};

function chat(req, res){
	res.render('chat',{title: 'Chat'});
};
