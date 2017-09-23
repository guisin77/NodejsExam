var http=require('http')
var fs=require('fs')

http.createServer(function (request, response) {
	if(request.method =='GET'){
	//get
	fs.readFile('index.html',
		function(error, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		});
	} else  if(request.method=='POST') {

	//post
		request.on('data' , function(data){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end('<h1>' + data + '</h1>');
		});
    }
}).listen(52273, function(){
	console.log('Server Running at http://127.0.0.1:52273');
})