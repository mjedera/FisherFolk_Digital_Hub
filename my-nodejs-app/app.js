// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const fs = require('fs'); // For checking/creating folders
const authRoutes = require('./src/routes/auth');
const applicantRoutes = require('./src/routes/applicantRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// --- Ensure upload folder exists ---
const photoDir = path.join(__dirname, 'src', 'public', 'applicant_photos');
if (!fs.existsSync(photoDir)) {
    fs.mkdirSync(photoDir, { recursive: true });
    console.log('✅ Created missing applicant_photos directory');
}

// --- Global Middleware ---
app.use(cors());
app.use(morgan('dev'));

// Increase body size limit to allow file uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(session({
    secret: 'my-super-secret-key-that-you-should-change',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000 // 2 minutes
    }
}));

app.use('/partials', express.static(path.join(__dirname, 'src/views/partials')));

// --- Routes ---
// Auth routes (login, register, etc.)
app.use('/', authRoutes);

// Applicant routes (with file upload)
app.use('/api/applicants', applicantRoutes);

// --- Serve main dashboard HTML ---
app.get('/userLogin', (req, res) => {
    const filePath = path.join(__dirname, 'src', 'views', 'user', 'userLogin.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Dashboard HTML file not found.');
    }
});

// Route to serve HTML fragments (optional)
app.get('/fragments/applicants', (req, res) => {
    const fragmentPath = path.join(__dirname, 'src', 'views', 'partials', 'userProfile.html');
    if (fs.existsSync(fragmentPath)) {
        res.sendFile(fragmentPath);
    } else {
        res.status(404).send('Applicants fragment not found.');
    }
});

// --- Error Handling Middleware ---
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running at: http://localhost:${PORT}`);
});

module.exports = app;
