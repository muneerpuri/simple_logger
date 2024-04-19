const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint
app.post('/log', (req, res) => {
    const data = req.body;
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${JSON.stringify(data)}\n`;

    // Write to a log file
    fs.appendFile(path.join(__dirname, 'log.txt'), logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Data logged successfully:', logEntry);
            res.status(200).send('Data logged successfully');
        }
    });
});

// GET endpoint
app.get('/log', (req, res) => {
    // Read the log file
    fs.readFile(path.join(__dirname, 'log.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading log file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send(data);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
