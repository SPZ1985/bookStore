console.log('hello world');
const hostname = '127.0.0.1';
const port = 3001;

var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

//below line is to add middleware for initialize bodyparser
app.use(bodyParser.json());

 Genre = require('./models/genres');
 Book = require('./models/books');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/',function(req, res){
	//res.send('Hello World');
	res.send('Please use /api/books  OR /api/genres');
	
});
//get all genres
app.get('/api/genres',function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});
//add a genre
app.post('/api/genres', function(req, res){
	var genre = req.body;

	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});
//update a genre
app.put('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});
//remove/delete a genre
app.delete('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.removeGenre(id, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});



//=============================================
//get all books
app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});
//get book by id
app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});
//add a book
app.post('/api/books', function(req, res){	
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});
//update book
app.put('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});
//remove/delete a book
app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});



app.listen(port);
console.log('running on port: '+port);
