var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static(__dirname + '/public'));

 

app.get('/', function(req,res){
	console.log('login success.....ed');

	if(req.cookies.auth) {
		res.send('<h1>Login Success</h1>'
				+ '<form method="POST" action="/logout"/>'
				+ '<input type="submit"  value="Logout"/>'
				+ '</form>'
			);

	} else { //로그인 하지 않았으면무조건 로그인 페이지로 
		res.redirect('/login') ;
	}
});

app.get('/login', function(req,res){
	fs.readFile(__dirname + '/public/login.html', 
		function(err,data){
			if(err){
				res.send(JSON.stringify(err));
			} else {
				res.send(data.toString());
			}
		})
});

app.post('/login', function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	if(username =='yang' && password =='1111') {
		res.cookie('auth' , true) ;
		console.log('login success');
		res.redirect('/');
		console.log('login success redirect ');
	} else {
		res.redirect('/login');
	}
});

app.post('/logout', function(req,res){ 
		res.clearCookie('auth') ;
		res.redirect('/login');
});

app.get('/a', function(req,res){
	res.send('<a href="/b">go to b</a>');
});

app.get('/b', function(req,res){

	res.send('<a href="/a">go to a</a>');
});

app.get('/page/:id', function(req,res) {
	var id = req.params.id;
	res.send('<h1>' + id + ' Page</h1>');
});
/*
app.use(function(req, res){

//	res.writeHead(200, {'Content-Type':'text/html'});
//	res.end('<h1>Hello, Express</h1>');(

	 console.log( req ); 
	
	var name = req.query.name;
	var region = req.query.region; 

	var agent =req.header('User-Agent');
	if(agent.toLowerCase().match(/chrome/)){
		res.send('<h1>Hello, Chrome</h1>'
                 + 'name :' + name
                 + '<br>region :' + region
			);
	} else {
		res.send('<h1>Hello, gorome</h1>')
	}

	var object = {
		name:'Yang'
		,age:10
		,marriage:false
		,friends:['Yang1','Yang2']
	    ,job : {name : 'banker', income:30}
	}
	//res.send(JSON.stringify(object));
	//res.send('<h1>Hello, Express send</h1>');

});
*/

app.listen(52273,function(){
	console.log('Server running...');
});