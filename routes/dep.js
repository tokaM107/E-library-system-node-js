var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM department RIGHT JOIN department_manger ON department.dep_name= department_manger.d_name;";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('dep', {title:'E-Library management system', action:'list', dep :data, message:request.flash('success')});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("dep", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_dep", function(request, response, next){

	var dep_name = request.body.dep_name;
	var dep_num = request.body.dep_num;
	var emp_id = request.body.emp_id;
	

	var query = `
	INSERT INTO department VALUES ("${dep_num}", "${dep_name}");
	INSERT INTO department_manger VALUES ("${dep_num}", "${emp_id}" , "${dep_name}");
	
  `;

	database.query(query, function(error, data){

		if(error)
		{
			
			throw error;
			

		}	
		else
		{
			request.flash('success', 'record Inserted');
			response.redirect("/dep");
		}

	});

});




router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM department WHERE dep_num = "${id}";
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'record Deleted');
			response.redirect("/dep");
		}

	});

});

module.exports = router;