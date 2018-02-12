const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
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
const INIT_DB = {
    todos: []
};
const jsonParser = bodyParser.json();

if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INIT_DB, null, 4));
}

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
    if (req.get('Authorization') === `Bearer ${TOKEN}`) {
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

router.post('/todos', jsonParser, (req, res) => {
    if (req.get('Authorization') === `Bearer ${TOKEN}`) {
        fs.readFile(DB_FILE, (err, data) => {
            const contents = JSON.parse(data);
            contents.todos = req.body.todos;
            fs.writeFile(DB_FILE, JSON.stringify(contents, null, 4), (err) => {
                res.status(200).json({
                    message: 'Success'
                });
            });
        });
    } else {
        res.status(401).json({
            message: 'You are not authorized to modify this content' 
        });
    }
});

router.get('/todos', (req, res) => {
    if (req.get('Authorization') === `Bearer ${TOKEN}`) {
        fs.readFile(DB_FILE, (err, data) => {
            res.status(200).json({
                todos: JSON.parse(data).todos,
                message: 'Success'
            });
        });
    } else {
        res.status(401).json({
            message: 'You are not authorized to view this content' 
        });
    }
});

module.exports = router;
