const authenticationService = require('../models/services/authenticationService')
const orderService = require('../models/services/orderService')

exports.myAccount = (req, res, next) => {
    if(req.user)
        res.render('my-account');
    else
        res.redirect('/login')
}

exports.accountInfo = (req, res, next) => { 
    console.log(req.user)
    if(req.user)
        res.render('account-info');
    else
        res.redirect('/login')
}

exports.updateInfoUser = async (req, res, next) => {
    console.log(req.body.address);

    req.user = await authenticationService.updateInfoUser(req.user.username, req.body.firstname, req.body.lastname, req.body.address, req.body.phonenumber, req.body.email);
    
    req.login(req.user, function(err) {
        if (err) { return next(err); }
        res.redirect('/my-account');
      });

    
}

exports.order = (req, res) => {
    if(req.user)
        res.render('products/order');
    else
        res.redirect('/login')
}

exports.listOrders = async(req, res) => { 
    if(req.user) {
        const orders = await orderService.getOrdertByID(req.user._id);

        res.send(orders);
    }
    else
        res.redirect('/login');   
}

