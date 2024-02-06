var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM borrow_books;";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('bbook', {title:'E-Library management system', action:'list', bbook :data, message:request.flash('success')});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("bbook", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_bbook", function(request, response, next){

	var b_id = request.body.b_id;
	var c_id = request.body.c_id;
	var borrow_date = request.body.borrow_date;

	

	var query = `
	INSERT INTO borrow_books VALUES ("${c_id}", "${b_id}" , "${borrow_date}" );
	
  `;

	database.query(query, function(error, data){

		if(error)
		{
			
			throw error;
			

		}	
		else
		{
			request.flash('success', 'record Inserted');
			response.redirect("/bbook");
		}

	});

});




router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM borrow_books WHERE b_id = "${id}";
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'record Deleted');
			response.redirect("/bbook");
		}

	});

});

module.exports = router;