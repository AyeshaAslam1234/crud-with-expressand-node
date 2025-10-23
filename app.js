const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const homeRoutes = require('./routers/home');

const app = express();
const port = process.env.PORT || 8080; 

mongoose.connect("mongodb://localhost:27017/studentdetails");


const db = mongoose.connection;

db.on('error', (err) => {
    console.error("Database connection error:", err);
});

db.once('open', () => {
    console.log("Connected to MongoDB");
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

// body parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', homeRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
