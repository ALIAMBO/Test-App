const db = require('../db'); 

exports.getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createUser = (req, res) => {
    const { username, password, email } = req.body;
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(query, [username, password, email], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, username, email });
    });
};
