// src/controllers/authControllers.js
const path = require('path');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Render login page
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
};

// Render registration page
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
};

// Handle login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // ✅ MODIFICATION 1: Ensure the SELECT query includes the 'id' column
        const [rows] = await pool.execute('SELECT id, username, password, role FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (!user) {
            console.log('Login failed: User not found');
            return res.status(401).send('<h1>Login Failed</h1><p>Invalid username or password.</p><p><a href="/login">Try again</a></p>');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Login failed: Invalid password');
            return res.status(401).send('<h1>Login Failed</h1><p>Invalid username or password.</p><p><a href="/login">Try again</a></p>');
        }

        // Login successful: store user details in session
        req.session.username = user.username;
        req.session.role = user.role || 'admin'; // default to admin if role missing
        
        // ✅ MODIFICATION 2: Store the user's primary key ID in the session
        req.session.userId = user.id; 
        
        console.log('Login successful for:', username);

        // ✅ MODIFICATION 3: Use session.save() before redirecting to ensure session data is written 
        // (especially important before an immediate redirect/AJAX response)
        req.session.save(err => {
            if (err) {
                console.error('Error saving session after login:', err);
            }
            // Use redirect as defined in your original code
            return res.redirect('/dashboard');
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('<h1>Server Error</h1><p>An unexpected error occurred during login.</p>');
    }
};

// Handle registration
exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            return res.status(409).send('<h1>Registration Failed</h1><p>Username already exists.</p><p><a href="/register">Try again</a></p>');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.execute(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role || 'user']
        );

        console.log('User registered successfully:', username);
        res.redirect('/login');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('<h1>Server Error</h1><p>An unexpected error occurred during registration.</p>');
    }
};

exports.getUserLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send("<script>alert('All fields are required'); window.location.href='/login';</script>");
    }

    try {
        const [rows] = await pool.query(
            "SELECT * FROM applicants WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            return res.send("<script>alert('Invalid username'); window.location.href='/login';</script>");
        }

        const user = rows[0];

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.send("<script>alert('Invalid password'); window.location.href='/login';</script>");
        }

        // 🎉 SUCCESS — CREATE APPLICANT SESSION
        req.session.applicantId = user.id;
        req.session.applicantName = user.username;
        req.session.applicantLoggedIn = true;

        req.session.save(err => {
            if (err) console.error(err);
            return res.redirect('/userDashboard');
        });

    } catch (err) {
        console.error(err);
        return res.send("<script>alert('Server error'); window.location.href='/login';</script>");
    }
};


// Dashboard page
exports.getDashboardPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));
};

// Return logged-in user info (username + role)
exports.getUser = (req, res) => {
    if (req.session.username) {
        res.json({
            username: req.session.username,
            role: req.session.role || 'user'
        });
    } else {
        res.json({});
    }
};
