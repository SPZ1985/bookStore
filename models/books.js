var mongoose = require('mongoose');

//book.schema
var bookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	publisher:{
		type: String
	},
	author:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema);

//get books
module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
}

//get single book 
module.exports.getBookById = function(id, callback){
	Book.findById(id, callback);
}
//add a book
module.exports.addBook = function(book, callback){
	Book.create(book, callback);
}
//update book
module.exports.updateBook = function(id, book, options, callback){
	var query = {_id: id};
	var update = {
					title: book.title,
					author: book.author,
					publisher: book.publisher,		
				}
	Book.findOneAndUpdate(query, update, options, callback);
}
//delete/remove book
module.exports.removeBook = function(id, callback){
	var query = {_id: id};
	Book.remove(query, callback);
}	