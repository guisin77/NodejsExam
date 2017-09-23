var http=require('http')
var fs=require('fs')
var ejs=require('ejs')
var jade=require('jade')

http.createServer(function (request, response) {


	if(request.method =='GET'){
		console.log(request.url + " GET")
		if(request.url =='/') {
		//get
		fs.readFile('index.html', function(error, data) {
			if(!error){
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.end(data);
			} else {
				response.writeHead(404);
				response.end();	
			}
			});
		} else if (request.url =='/ejs') {
			fs.readFile('template.ejs', 'utf8', function (error, data){
				if(!error) {
					var html = ejs.render ( data, 
							{name:'yang' , description:'Hello. Yang'} 	)
					response.writeHead(200, {'Content-Type':'text/html'});
					response.end(html);
				}
			})
		} else if (request.url =='/jade') {
			console.log('aaa')
			fs.readFile('template.jade', 'utf8', function (error, data){
				if(!error) {
					var fn = jade.compile ( data) ;
					var html = fn( {name:'yang' , description:'Hello. Yang'} ); 
					response.writeHead(200, {'Content-Type':'text/html'});
					response.end(html);
				}
			})
		}
    } else  if(request.url =='POST') {
		//post
			request.on('data' , function(data){
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.end('<h1>' + data + '</h1>');
			});
	    
	}
}).listen(52273, function(){
	console.log('Server Running at http://127.0.0.1:52273');
})