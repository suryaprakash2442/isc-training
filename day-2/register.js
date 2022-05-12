const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'im41tb24',
	database : 'nodelogin'
});
const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/register.html'));
});
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		connection.query("SELECT * from accounts WHERE username = ?", [username], function(error,results,fields){
			if(error) throw error;
			if(results.length >0){
				response.send("Username already exists!")
			} else{
				// Execute SQL query that'll select the account from the database based on the specified username and password
				connection.query('INSERT INTO accounts VALUE (?, ?);', [username, password], function(error, results, fields) {
					// If there is an issue with the query, output the error
					if (error) throw error;
					response.redirect('/')		
				});
			} 
		})
	}
	else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
// http://localhost:3000/home~
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});
app.listen(3000, console.log('Server started on port 3000'));