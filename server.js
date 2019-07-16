var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var databaseInformation = require('./database');

var endpointExpenses = require('./endpoints/expenses');
var endpointUsers = require('./endpoints/users');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
    
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: '' })
});

// connection configuration
var databaseConnection = mysql.createConnection(databaseInformation);
  
// connect to database
databaseConnection.connect();
 
// initialize endpoints
endpointExpenses.initialize(app, databaseConnection);
endpointUsers.initialize(app, databaseConnection);


 
// set port
app.listen(app.get('port'), function () {
    console.log('Node app is running on port ' + app.get('port'));
});
 
module.exports = app;