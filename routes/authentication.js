const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const passport = require('../models/passport');


/* GET home page. */
router.get('/register', authenticationController.registerShow);

router.post('/register', authenticationController.register);

router.get('/login', authenticationController.loginShow);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile'] }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/login'
}));

router.get('/auth/facebook',
  passport.authenticate('facebook', {scope:'email'}));

router.get('/facebook/callback',
    passport.authenticate( 'facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
}));

router.get('/logout', authenticationController.logout);

router.get('/forget-password', authenticationController.forgetPassword);

router.post('/update-password', authenticationController.updatePassword);

router.get('/api/check-username-exist/:username', authenticationController.checkUserExist);

module.exports = router;
