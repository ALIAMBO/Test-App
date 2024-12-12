const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database'
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Root URL handler
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});


// User Login Route
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: user.id, role_type: user.role_type }, 'your_jwt_secret', {
                expiresIn: '1h'
            });

            res.json({
                status: 200,
                message: 'Logged in',
                result: {
                    user_id: user.id,
                    access_token: token,
                    token_type: 'Bearer',
                    role_type: user.role_type,
                    expires_at: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
                }
            });
        });
    });
});

// Get Listing Route
app.get('/listing/get', (req, res) => {
    const { id, access_token } = req.query;

    if (!id || !access_token) {
        return res.status(400).json({ message: 'Please provide id and access_token' });
    }

    jwt.verify(access_token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        db.query('SELECT * FROM listings WHERE user_id = ?', [id], (err, results) => {
            if (err) throw err;

            res.json({
                status: 200,
                message: 'Success',
                result: {
                    current_page: 1,
                    data: results.map(listing => ({
                        id: listing.id,
                        name: listing.name,
                        distance: calculateDistance(listing.latitude, listing.longitude), // Implement distance calculation based on coordinates
                        created_at: listing.created_at,
                        updated_at: listing.updated_at
                    }))
                }
            });
        });
    });
});

// Function to calculate distance (You need to implement this based on coordinates)
function calculateDistance(lat, lon) {
    // Distance calculation logic here
    return 0; // Placeholder value
}
