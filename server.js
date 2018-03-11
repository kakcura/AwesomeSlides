/*!
* AwesomeSlides Server
* Created by Korhan Akcura
*/
var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
	console.log('Page requested...');

	var filePath = './public' + request.url;
	if (filePath == './public/') {
		// The default page
		filePath = './public/index.html';
	}

	var contentType = request.headers['content-type'];


	fs.readFile(filePath, function(error, content) {
		if (error) {
			if(error.code == 'ENOENT'){
				response.writeHead(404);
				response.end('<b>Not Found: '+error.code+'</b>'); 
			}
			else {
				response.writeHead(500);
				response.end('<b>Internal Server Error: '+error.code+'</b>'); 
			}
		}
		else if (request.url.indexOf('.css') != -1) {
			response.setHeader("Content-Type", 'text/css');
			response.write('styles.css');
		}
		else {
			response.writeHead(200, { 'Content-Type': "contentType" });			
		}
		response.end(content, 'utf-8');
	});

}).listen(8081);
console.log('Server running...');