var bodyParser=require('body-parser')
var mongoose = require('mongoose')

// //connect to database

mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true, useCreateIndex:true});
//create a schema
var todoSchema=new mongoose.Schema({
    item:String
});

//model
var Todo = mongoose.model('Todo',todoSchema);
// var itemOne = Todo({item:'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved')
// })

// var data= [{item:'get milk'},{item:'kurkure'},{item:'coldrink'}]

var urlencodedParser = bodyParser.urlencoded({extended:false})

//control routes,views,passing data to views
module.exports=function(app){
    
    //request handlers
    app.get('/todo',function(req,res){
        //get data from mongodb and pass it to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data})
        })
        //res.render('todo',{todos:data})

    })

    app.post('/todo',urlencodedParser,function(req,res){
        //get data from view and add it to mongodb
        var newTodo=Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        })
        // data.push(req.body)
        // res.json(data)
    })
    app.delete('/todo/:item',function(req,res){
        // delete reqested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        })
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g,'-') !== req.params.item; 
        })
        // res.json(data)
    
}