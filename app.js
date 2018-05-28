const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost/body-journal3-dev')
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

//load idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//handlebars middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//index route
app.get('/', (req, res) =>{
	const title = 'Welcome';
	res.render('index', {
	title: title
	});
});

//ABOUT ROUTE
app.get('/about', (req,res) =>{
	res.render('about');
})

//add idea form
app.get('/ideas/add', (req,res) =>{
	res.render('ideas/add');
})



const port = 5000;

app.listen(port, () =>{
	console.log(`Server started on port ${port}`);
});