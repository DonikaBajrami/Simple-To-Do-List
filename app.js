var express = require('express');
var session = require('cookie-session'); 
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var app = express();

// Set up template engine
app.set('view engine', 'ejs');


// Static Files
app.use(express.static(__dirname + '/public'));


// Using the Sessions
app.use(session({secret: 'todotopsecret'}));


/*If there is no todolist in the session,
we create an empty array */
app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});

//Display the todolist and the form
app.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
});

//Add an element to the todolist
app.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
});

//Remove an element from the todolist
app.get('/todo/remove/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

//Redirect to the todolist if the requested page is not found 
app.use(function(req, res, next){
    res.redirect('/todo');
});

// Listening Port 
app.listen(3000);  
console.log('Server Started');