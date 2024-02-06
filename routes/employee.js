var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM employee LEFT JOIN employee_phone ON employee.employee_id = employee_phone.emp_id LEFT JOIN employee_address ON employee.employee_id = employee_address.employee_id;";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('employee', {title:'E-Library management system', action:'list', employee :data, message:request.flash('success')});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("employee", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_employee", function(request, response, next){

	var employee_id = request.body.employee_id;
	var emp_firstname = request.body.emp_firstname;
	var emp_lastname = request.body.emp_lastname;
	var birth_date = request.body.birth_date;
	var d_num = request.body.d_num;
	var emp_id = request.body.emp_id;
	var phone = request.body.phone;
	var employee_id = request.body.employee_id;
	var country = request.body.country;
	var city = request.body.city;
	var region = request.body.region;
	var street_name = request.body.street_name;
	var postal_code = request.body.postal_code;

	var query = `
	INSERT INTO employee VALUES ("${employee_id}", "${emp_firstname}", "${emp_lastname}", "${birth_date}", "${d_num}");
	INSERT INTO employee_phone VALUES ("${emp_id}", "${phone}");
	INSERT INTO employee_address VALUES ("${employee_id}", "${country}", "${city}", "${region}", "${street_name}", "${postal_code}");
  `;

	database.query(query, function(error, data){

		if(error)
		{
			
			throw error;
			

		}	
		else
		{
			request.flash('success', 'record Inserted');
			response.redirect("/employee");
		}

	});

});




router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM employee WHERE employee_id = "${id}";
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'record Deleted');
			response.redirect("/employee");
		}

	});

});

module.exports = router;