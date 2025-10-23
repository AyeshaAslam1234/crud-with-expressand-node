const express = require('express');
const Router = express.Router();
const Club = require('../Models/club');

// Home Page
Router.get('/', (req, res) => {
    res.render('index');
});

// Insert Data
Router.post('/add', async (req, res) => {
    try {
        const { name, email } = req.body;
        const club = new Club({ name, email });
        await club.save();
        res.redirect('/show');
    } catch (err) {
        console.error("Save Error:", err);
        res.status(500).send("Error saving to database");
    }
});

// Show All Students
Router.get('/show', async (req, res) => {
    try {
        const docs = await Club.find();
        res.render('show', {
            students: docs
        });
    } catch (err) {
        console.error("Fetch Error:", err);
        res.status(500).send("Error fetching from database");
    }
});

// Edit Page
Router.get('/edit/:id', async (req, res) => {
    try {
        const student = await Club.findById(req.params.id);
        res.render('edit', { studentdata: student });
    } catch (err) {
        console.error("Edit Fetch Error:", err);
        res.redirect('/show');
    }
});

// Update Data
Router.post('/edit/:id', async (req, res) => {
    try {
        await Club.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/show');
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).send("Error updating record");
    }
});

// Delete Record
Router.get('/delete/:id', async (req, res) => {
    try {
        await Club.findByIdAndDelete(req.params.id);
        res.redirect('/show');
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Error deleting record");
    }
});

module.exports = Router;
