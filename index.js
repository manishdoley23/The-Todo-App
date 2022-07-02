const express = require('express');
const port = 8000;
const path = require('path');

const app = express();

var todoList = [
    {
        description: "School Work",
        date: "1/7/2022",
        categories: "School"
    },
    {
        description: "College Work",
        date: "1/7/2022",
        categories: "College"
    },
    {
        description: "Office Work",
        date: "1/7/2022",
        categories: "Office"
    }
]


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req,res){
    return res.render('home', {
        title: "The Todo",
        todo_list: todoList
    });
});

app.post('/create-todo', function(req, res){
    todoList.push(req.body);
    // console.log(req.body.categories);
    return res.redirect('/');
})

app.listen(port, function(err){
    if(err){
        console.log("error in running server", err);
    }
    console.log("server up and running on port:", port);
});