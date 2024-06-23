const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database setup
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT, description TEXT, dueDate TEXT)");
});

// API Routes

// Get all tasks
app.get('/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description, dueDate } = req.body;
    db.run("INSERT INTO tasks (title, description, dueDate) VALUES (?, ?, ?)", [title, description, dueDate], function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ id: this.lastID });
        }
    });
});

// Get a task by ID
app.get('/tasks/:id', (req, res) => {
    db.get("SELECT * FROM tasks WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(row);
        }
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { title, description, dueDate } = req.body;
    db.run("UPDATE tasks SET title = ?, description = ?, dueDate = ? WHERE id = ?", [title, description, dueDate, req.params.id], function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ changes: this.changes });
        }
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    db.run("DELETE FROM tasks WHERE id = ?", [req.params.id], function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ changes: this.changes });
        }
    });
});

app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`);
});
