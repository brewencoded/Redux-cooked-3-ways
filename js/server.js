const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();
const PORT = 3001;

const EMAIL = 'test@test.com';
const PASSWORD = 'test';
const TOKEN = 'abc123';
const PROFILE = {
    name: 'test',
    email: EMAIL
};
const DB_FILE = 'db.json';

router.get('/login', (req, res) => {
    if (req.query.email === EMAIL && req.query.password === PASSWORD) {
        res.status(200).json({
            profile: PROFILE,
            token: TOKEN,
            message: 'Sucess'
        });
    } else {
        res.status(401).json({
            message: 'Invalid email & password combination' 
        });
    }
});

router.get('/profile', (req, res) => {
    if (req.get('Authentication') === `Bearer ${TOKEN}`) {
        res.status(200).json({
            profile: PROFILE,
            message: 'Success'
        });
    } else {
        res.status(401).json({
            message: 'You are not authorized to view this content' 
        });
    }
});

router.post('/todos', (req, res) => {
    if (req.get('Authorization') === `Bearer ${TOKEN}`) {
        fs.writeFile(DB_FILE, req.body.todos, (err) => {
            if (err) console.log(err.message);
            res.status(200).json({
                message: 'Success'
            });
        })
    } else {
        res.status(401).json({
            message: 'You are not authorized to modify this content' 
        });
    }
});

router.get('/todos', (req, res) => {
    console.log(req.get('Authorization'));
    if (req.get('Authorization') === `Bearer ${TOKEN}`) {
        fs.readFile(DB_FILE, (err, data) => {
            if (err) console.log(err.message);
            if (data) console.log(JSON.parse(data));
            res.status(200).json({
                todos: data,
                message: 'Success'
            });
        })
    } else {
        res.status(401).json({
            message: 'You are not authorized to view this content' 
        });
    }
});

module.exports = router;
