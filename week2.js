const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// JSON Parsing Middleware
app.use(express.json());

// Bonus: Custom Logging Middleware
app.use((req, res, next) => {
    console.log(
        `${new Date().toISOString()} - ${req.method} ${req.url}`
    );
    next();
});

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// GET /
app.get("/api", (req, res) => {
    res.send("My Week 2 API!");
});

// POST /user
app.post("/user", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    res.json({
        message: `Hello, ${name}!`
    });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
    const { id } = req.params;

    res.send(`User ${id} profile`);
});

// Error Handling
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
