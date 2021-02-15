var express=require('express');
var todoController=require("./controllers/todoController")
var app=express();

// var indexRouter = require('./routes/index');

//set up template engine
app.set('view engine','ejs');

//static files
app.use(express.static(  './public'));

//fire controllers
todoController(app);

// app.use('/', indexRouter);

//listen to port
app.listen(3000);
console.log("port");