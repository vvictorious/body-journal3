const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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


//process form
app.post('/ideas', (req, res) =>{
	let errors = [];
	if(!req.body.title){
		errors.push({text:'Please add what you ate today.'});
	}
	if(!req.body.details){
	errors.push({text:'Please add your workout.'});
	}

	if(errors.length > 0){
		res.render('ideas/add', {
			errors: errors,
			title: req.body.title,
			details: req.body.details
		});
	} else {
		res.send('passed');
	}
})


const port = 5000;

app.listen(port, () =>{
	console.log(`Server started on port ${port}`);
});