var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = " SELECT *FROM customer LEFT JOIN customer_phone ON customer.cus_id = customer_phone.cus_id LEFT JOIN customer_address ON customer.cus_id = customer_address.c_id;";
    

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('customer', {title:'E-Library management system', action:'list', customer :data, message:request.flash('success')});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("customer", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_customer", function(request, response, next){

	var cus_id = request.body.cus_id;
    var empid=request.body.empid;
	var cus_firstname = request.body.cus_firstname;
	var cus_lasttname = request.body.cus_lasttname;
	var email = request.body.email;
	var cus_id = request.body.cus_id;
	var phone = request.body.phone;
    var c_id= request.body.c_id;
	var country = request.body.country;
	var city = request.body.city;
	var street_name = request.body.street_name;
	var postal_code = request.body.postal_code;

	var query = `
	INSERT INTO customer VALUES ("${cus_id}", "${empid}","${cus_firstname}", "${cus_lasttname}", "${email}" );
	INSERT INTO customer_address VALUES ("${c_id}", "${country}", "${city}", "${street_name}", "${postal_code}");
	INSERT INTO customer_phone VALUES ("${cus_id}", "${phone}");
	
  `;

	database.query(query, function(error, data){

		if(error)
		{
			
			throw error;
			

		}	
		else
		{
			request.flash('success', 'record Inserted');
			response.redirect("/customer");
		}

	});

});




router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM customer WHERE cus_id = "${id}";
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'record Deleted');
			response.redirect("/customer");
		}

	});

});

module.exports = router;