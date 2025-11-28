// src/middleware/authMiddleware.js

/**
 * Middleware to check authentication and optionally a specific role.
 * @param {string} requiredRole - Optional. Role required to access the route (e.g., 'admin').
 */
const authMiddleware = (requiredRole) => {
    return (req, res, next) => {
        // Check if the user is logged in
        if (!req.session || !req.session.username) {
            console.log('User is not authenticated. Redirecting to login page.');
            return res.redirect('/login');
        }

        // If a role is required, check if the user's role matches
        if (requiredRole && req.session.role !== requiredRole) {
            console.log(`Access denied. User role "${req.session.role}" is not allowed.`);
            return res.status(403).send('<h1>Forbidden</h1><p>You do not have permission to access this page.</p>');
        }

        // User is authenticated (and has the required role, if any)
        next();
    };
};

module.exports = authMiddleware;
