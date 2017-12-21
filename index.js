/*
* Auth with
* Express JS
* JWT
*/

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
// Main route
app.get('/api', (req,res) => {
    res.json({
        message: 'Welcome to my API'
    });
});
// Post routes
app.post('api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secetkey', (err, authData) => {
        if (err) {
            res,sendStatus(403);
        } else {
            res.json({
                message: 'Post Created..',
                authData
            });
        }
    });
});

// Login route
app.post('/api/login',(req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
    })
    // Mock user
    const user = {
        id: 1,
        username: 'ant',
        email: 'ant@email.com'
    }
    jwt.sign(user), 'secretKey', { expiresIn: '30s'}, (err, token) =>{
        res.json({
            token
        });
    };
});    

// verify Token
function verifyToken(req, res, next) {
    // get auth header
    const bearerHeader = req.headers['authorization'];
    // if defined/not
    if (typeof bearerHeader !== 'undefined') {
        // split
        const bearer = bearerHeader.split(' ');
        // token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        // Middlewear
        next();
    } else {
        // forbidden
        res.sendStatus(403);
    }
}

// backend port
app.listen(5000, () => console.log('Server started on 5000'));