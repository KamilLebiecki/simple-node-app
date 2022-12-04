// const Person = require('./person');
// import Person from './person';

// const person1 = new Person('Kamil', 30);
// person1.greeting();

// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message', (data) => console.log('Called Listener', data));
// logger.log('hello');

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
	// if (request.url === '/') {
	// 	fs.readFile(
	// 		path.join(__dirname, 'public', 'index.html'),
	// 		(err, content) => {
	// 			if (err) throw err;
	// 			response.writeHead(200, { 'Content-Type': 'text/html' });
	// 			response.end(content);
	// 		}
	// 	);
	// }
	// if (request.url === '/about') {
	// 	fs.readFile(
	// 		path.join(__dirname, 'public', 'about.html'),
	// 		(err, content) => {
	// 			if (err) throw err;
	// 			response.writeHead(200, { 'Content-Type': 'text/html' });
	// 			response.end(content);
	// 		}
	// 	);
	// }
	// if (request.url === '/api/users') {
	// 	const users = [
	// 		{ name: 'Bob', age: 40 },
	// 		{ name: 'Steve', age: 59 },
	// 	];
	// 	response.writeHead(200, { 'Content-Type': 'application/json' });
	// 	response.end(JSON.stringify(users));
	// }

	// Build filepath
	let filePath = path.join(
		__dirname,
		'public',
		request.url === '/' ? 'index.html' : request.url
	);

	// Extension of the file
	let extname = path.extname(filePath);

	// Initial content type
	let contentType = 'text/html';

	// Check ext and set content type

	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
	}

	// Read File
	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code == 'ENOENT') {
				// Page not found
				fs.readFile(
					path.join(__dirname, 'public', '404.html'),
					(err, content) => {
						response.writeHead(200, { 'Content-Type': 'text/html' });
						response.end(content, 'utf8');
					}
				);
			} else {
				// Some server error
				response.writeHead(500);
				response.end(`Server Error: ${err.code}`);
			}
		} else {
			// Success
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(content);
		}
	});
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
