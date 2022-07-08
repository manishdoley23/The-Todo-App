const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();

var todoList = [
    {
        description: "School Work",
        date: "1-7-2022",
        category: "School"
    },
    {
        description: "College Work",
        date: "1-7-2022",
        category: "College"
    },
    {
        description: "Office Work",
        date: "1-7-2022",
        category: "Office"
    }
]

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));

app.get('/', function(req,res){

    Todo.find({}, function(err, todos){
        if(err){
            console.log('error in fetching data from db');
            return;
        }
        return res.render('home', {
            title: "The Todo",
            todo_list: todos
        });
    });

});

app.post('/create-todo', function(req, res){

    Todo.create(
        req.body
    , function(err, newTodo){
        // console.log(description, date, category);
        if(err){
            console.log('error creating contact');
            return;
        }
        console.log('*********', newTodo);
        return res.redirect('/');
    })
    // console.log(req.body.description, req.body.date, req.body.category);
    // todoList.push();
    // return res.redirect('back');

})

app.get('/delete-contact', function(req, res){

    let id = req.query.id;

    Todo.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error from deleting from db');
            return;
        }
        return res.redirect('back');
    });

});

app.listen(port, function(err){
    if(err){
        console.log("error in running server", err);
    }
    console.log("server up and running on port:", port);
});