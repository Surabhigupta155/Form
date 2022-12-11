const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const {sequelize} = require('./models')

const app = express();

app.use(express.json())

// check if server is responding to our request
app.get('/', (req, res) => res.send('Welcome to the server'));

// mount the specified middleware function at the path which is being specified
const admissionform = require('./routes/admissionform');
app.use('/admissionform', admissionform);

const PORT = process.env.PORT || 8081;

// start server and listen on port 8081 for connections
app.listen(PORT, async() => {
    console.log('Server up on http://localhost:8081')
    await sequelize.authenticate() // synchronize sequelize model with database tables
    console.log('Database Connected!');
})

