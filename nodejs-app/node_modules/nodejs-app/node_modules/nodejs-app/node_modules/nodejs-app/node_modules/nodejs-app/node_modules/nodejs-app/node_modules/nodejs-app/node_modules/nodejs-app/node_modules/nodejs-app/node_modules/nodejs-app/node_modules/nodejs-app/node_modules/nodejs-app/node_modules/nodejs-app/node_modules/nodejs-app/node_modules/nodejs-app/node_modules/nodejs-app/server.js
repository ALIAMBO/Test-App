const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'assessment'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        throw err;
    }
    console.log('MySQL Connected...');
});

// Login Endpoint 
app.post('/auth/login', (req, res) => { 
    const { username, password } = req.body;
     // Add logic to authenticate user 
res.status(200).json({ message: 'Login successful' }); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const routes = require('./routes/routes');
app.use('/', routes);

app.set('view engine', 'ejs');
