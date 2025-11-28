module.exports = function (req, res, next) {
    if (!req.session.applicantLoggedIn) {
        return res.redirect('/userLogin');
    }
    next();
};
