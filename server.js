const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Added for MongoDB connection
const morgan = require('morgan'); // Added for logging
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev')); // Use morgan for logging requests

// Connect to MongoDB (if required)
mongoose.connect('mongodb://localhost:27017/ttt-website', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Import the Item model
const Item = require('./itemModel'); 

// CRUD Routes for items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch items', details: err });
    }
});

app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).send({ error: 'Failed to create item', details: err });
    }
});

app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).send('Item not found');
        res.json(item);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch item', details: err });
    }
});

app.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).send('Item not found');
        res.json(updatedItem);
    } catch (err) {
        res.status(400).send({ error: 'Failed to update item', details: err });
    }
});

app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).send('Item not found');
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to delete item', details: err });
    }
});

// Events Endpoint
app.get('/api/events', async (req, res) => {
    // Sample data for events
    const events = [
        { id: 1, title: 'College Fest', date: '2023-12-01' },
        { id: 2, title: 'School Sports Day', date: '2023-12-15' },
    ];
    res.json(events);
});

app.post('/api/events', async (req, res) => {
    const newEvent = req.body; // Assuming the event data is sent in the request body
    // Here you would typically save the event to the database
    res.status(201).json(newEvent); // Respond with the created event
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log('Received contact form submission:', { name, email, subject, message });
    res.json({ success: true, message: 'Message received!' });
});

const User = require('./userModel'); // Import the User model

// User Registration Route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ username, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).send({ error: 'Failed to register user', details: err });
    }
});

// User Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        
        res.json({ message: 'Login successful!' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to log in', details: err });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
