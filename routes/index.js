module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
//module.exports.logOut = logOut;
module.exports.chat = chat;

function index(req, res){
	res.cookie('IndexCookie','This was set from Index');
	res.render('index',{title: 'Index title', cookie: JSON.stringify(req.cookies)});
};

function login(req, res){
	res.render('login',{title: 'Index title'});
};

function loginProcess(req, res){
    res.redirect('/');
};

function chat(req, res){
	res.render('chat',{title: 'Index title'});
};
