const authenticationService = require('../models/services/authenticationService')


exports.register = async (req, res, next) => {
    await authenticationService.register(req.body.username, req.body.password, req.body.c_password, req.body.firstname, req.body.lastname, req.body.address, req.body.phonenumber, req.body.email);

    res.redirect('/login');
}

exports.registerShow = (req, res, next) => {
    res.render('authentication/register', {title: 'Register'});
}

exports.loginShow = (req, res, next) => {
    if(req.user) {
        res.locals.user = req.user;
        res.redirect('/');
    }
    else
        res.render('authentication/login', { title: 'Login'});
}

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
  };


exports.checkUserExist = async(req, res) => {
    const user = await authenticationService.isUserExist(req.params.username);

    res.send(!!user);
}