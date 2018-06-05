if(process.env.NODE_ENV === 'production'){
	module.exports = {mongoURI: 'mongodb://victor:victor1@ds247830.mlab.com:47830/body-journal3'}
} else {
	module.exports = {mongoURI: 'mongodb://localhost/body-journal3-dev'}
}