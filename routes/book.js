var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM book;";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('book', {title:'E-Library management system', action:'list', book :data, message:request.flash('success')});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("book", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_book", function(request, response, next){

	var book_id = request.body.book_id;
	var kind = request.body.kind;
	var title = request.body.title;
	var author = request.body.author;
	var price = request.body.price;
	var avalibility = request.body.avalibility;
	

	var query = `
	INSERT INTO book VALUES ("${book_id}", "${kind}" , "${title}" , "${author}" ,"${price}", "${avalibility}");
	
  `;

	database.query(query, function(error, data){

		if(error)
		{
			
			throw error;
			

		}	
		else
		{
			request.flash('success', 'record Inserted');
			response.redirect("/book");
		}

	});

});




router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM book WHERE book_id = "${id}";
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'record Deleted');
			response.redirect("/book");
		}

	});

});

module.exports = router;