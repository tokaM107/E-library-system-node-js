var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM publisher LEFT JOIN pub_address ON publisher.pub_id= pub_address.pub_ID LEFT JOIN published_books ON publisher.pub_id= published_books.pubID;";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('publisher', {title:'E-Library management system', action:'list', publisher :data, message:request.flash('success')});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("publisher", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_publisher", function(request, response, next){


	var pub_id = request.body.pub_id;
	var pub_name = request.body.pub_name;
	var country = request.body.country;
	var city = request.body.city;
	var region = request.body.region;
	var street_name = request.body.street_name;
	var postal_code = request.body.postal_code;
    var book_id= request.body.book_id;
   var pub_date=request.body.pub_date;

	var query = `
	INSERT INTO publisher VALUES ("${pub_id}", "${pub_name}");
    INSERT INTO pub_address VALUES ("${pub_id}", "${country}", "${city}", "${region}", "${street_name}", "${postal_code}");
	INSERT INTO published_books VALUES ("${book_id}", "${pub_id}" , "${pub_date}");
	
  `;

	database.query(query, function(error, data){

		if(error)
		{
			
			throw error;
			

		}	
		else
		{
			request.flash('success', 'record Inserted');
			response.redirect("/publisher");
		}

	});

});




router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM publisher WHERE pub_id = "${id}";
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'record Deleted');
			response.redirect("/publisher");
		}

	});

});

module.exports = router;