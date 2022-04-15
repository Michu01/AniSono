const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const songRoutes = require('./routes/songRoutes');

const PORT = process.env.PORT || 3000;

//Init express app
const app = express();

//Connect to db
const dbURI = process.env.CONNECTION_STRING;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => console.log(err));

//Set view engine to ejs
app.set('view engine', 'ejs');

//Set static files path
app.use(express.static('public'));

//Set extended url encoding
app.use(express.urlencoded({ extended:true }));

//Morgan
app.use(morgan('dev'));

//Render index page
app.get('/', (req, res) => {
    res.render('index', { title: "Strona główna", image: "images/welcome.jpg" });
});

//Use song routes
app.use('/songs', songRoutes);

//Redirect to 404 page
app.use((req, res) => {
    res.status(404);
    res.render('404', { title: "Nie znaleziono!" });
});

//Listen
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

