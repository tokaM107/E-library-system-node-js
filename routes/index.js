var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/index', (req, res) => {
  res.render('index', { title: 'Express', session : req.session });
});

router.post('/index', function(request, response, next) {
  var employee_id = request.body.employee_id;
  var login_password = request.body.login_password;

  if (employee_id && login_password) {
    var query = `
      SELECT * FROM login 
      WHERE employee_id = "${employee_id}"
    `;

    database.query(query, function(error, data) {
      if (data.length > 0) {
        for (var count = 0; count < data.length; count++) {
          if (data[count].login_password == login_password) {
            request.session.login_id = data[count].login_id;
            response.redirect("/tables");
          } else {
            response.send('Incorrect Password');
          }
        }
      } else {
        response.send('Incorrect employee id');
      }
      response.end();
    });
  } else {
    response.send('Please Enter Email Address and Password Details');
    response.end();
  }
});

module.exports = router;