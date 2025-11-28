// src/routes/auth.js
const express = require('express');
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');
const userAuth = require('../middleware/userAuth');
const path = require('path');

const router = express.Router();

// Public routes
router.get('/', (req, res) => res.redirect('/login'));
router.get('/login', authController.getLoginPage);
router.post('/login', authController.loginUser);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.registerUser);
router.post("/userLogin", authController.getUserLogin);



// User dashboard route
router.get('/userDashboard', userAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'user', 'userDashboard.html'));
});




// Admin-only routes
router.get('/user', authMiddleware('admin'), authController.getUser);

router.get('/dashboard', authMiddleware('admin'), (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));

});

router.get('/accounts', authMiddleware('admin'), (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));

});
router.get('/test-session', authMiddleware('admin'), (req, res) => {
    res.json({ message: 'Session is active!', session: req.session });
});



// Logout route
router.get('/logout', authMiddleware(), (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/login');
    });
});

router.get('/userLogout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Error logging out");
        res.redirect('/login');
    });
});

module.exports = router;
