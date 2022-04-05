const authenticationService = require('../models/services/authenticationService')

exports.myAccount = (req, res, next) => {
    res.render('my-account');
}

exports.accountInfo = (req, res, next) => {
    res.render('account-info');
}

exports.updateInfoUser = async (req, res, next) => {
    await authenticationService.updateInfoUser(req.user.username, req.body.firstname, req.body.lastname, req.body.address, req.body.phonenumber, req.body.email);

    res.redirect('/my-account');
}

