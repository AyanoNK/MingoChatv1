const router = require('express').Router();
const { isLoggedIn } = require('../lib/auth');
module.exports = io => {
    router.get('/general', isLoggedIn, (req, res) => {
        res.render('general');
    });

    router.get('/', isLoggedIn,(req, res) => {
        res.render('index');
    });

    return router;
};