const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const {sequelize} = require('./models')

const app = express();

app.use(express.json())

app.get('/', (req, res) => res.send('Welcome to the server'));

const pitches = require('./routes/pitches');
app.use('/pitches', pitches);

const prt = process.env.prt || 8081;

app.listen(prt, async() => {
    console.log('Server up on http://localhost:8081')
    await sequelize.authenticate()
    console.log('Database Connected!');
})

