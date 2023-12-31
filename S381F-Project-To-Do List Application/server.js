const assert = require('assert');
const express = require('express');
const session = require('cookie-session');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const ObjectID = require('mongodb').ObjectID;
const mongourl = 'mongodb+srv://rogerchan:12345678abc@cluster0.nkfu5zj.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'project'

const client = new MongoClient(mongourl, {
	serverSelectionTimeoutMS: 5000,
});
let db;
try {
  client.connect().then(() => {
    db = client.db(dbName); // Assign client.db to the global db variable
    console.log(`Connected to MongoDB server.`);
  }).catch(err => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });
} catch (err) {
  console.error(err);
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs');

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

const users = new Array(
{name: 'guest1', password: 'guest'},
{name: 'guest2', password: 'guest'}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
console.log(req.session);
if (!req.session.authenticated) {
res.redirect('/login');
} else {
res.status(200).render('todo',{name:req.session.name});
}
});

app.get('/login', (req,res) => {
res.status(200).render('login',{});
});

app.post('/login', (req, res) => {
  users.forEach((user) => {
    if (user.name == req.body.name && user.password == req.body.password) {
      req.session.authenticated = true;
      req.session.username = req.body.name;
      res.redirect('/todo');
    }
  });
});


app.get('/logout', (req,res) => {
req.session = null;
res.redirect('/');
});

app.get('/back', (req,res) => {
req.session = null;
res.redirect('/todo');
});


const addTask = async function (db, createdDocuments) {
  try {
    const result = await db.collection('tasks').insertOne(createdDocuments);
    console.log(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
};


var task = [];

app.get("/todo", (req, res) => {
  res.status(200).render('todo', { name: req.session.username, t: task });
});

app.get("/addtask", (req, res) => {
  res.status(200).render('addtask', { name: req.session.username, t: task });
});

app.post('/addtask', async function (req, res) {
  try {
    await addTask(db, { task: req.body.newtask });
    task.push(req.body.newtask);
    res.redirect("/addtask");
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});



app.get("/completetask", (req, res) => {
    res.status(200).render('complete', { name: req.session.username, t: task, c: complete });
});



var complete = [];

app.post("/completetask", (req, res) => {
   var completeTask = req.body.check;

   if (typeof completeTask === "string") {
      complete.push(completeTask);
      task.splice(task.indexOf(completeTask), 1);
   } else if (Array.isArray(completeTask)) {
      completeTask.forEach((item) => {
         complete.push(item);
         task.splice(task.indexOf(item), 1);
      });
   }

   res.redirect("/todo");
});


app.post("/deletecompleted", (req, res) => {
    var deleteCheck = req.body.deleteCheck;
    if (typeof deleteCheck === "string") {
        complete.splice(complete.indexOf(deleteCheck), 1);
    } else if (typeof deleteCheck === "object") {
        for (var i = 0; i < deleteCheck.length; i++) {
            complete.splice(complete.indexOf(deleteCheck[i]), 1);
        }
    }
    res.redirect("/completetask");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
