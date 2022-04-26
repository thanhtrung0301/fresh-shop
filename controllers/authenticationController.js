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


exports.forgetPassword = function (req, res) {
    res.render('authentication/forget-password', {title: 'Forget Password'});
};

exports.updatePassword = function (req, res) {
    //     var token = req.body.token;
    //     var password = req.body.password;
     
    //    connection.query('SELECT * FROM users WHERE token ="' + token + '"', function(err, result) {
    //         if (err) throw err;
     
    //         var type
    //         var msg
     
    //         if (result.length > 0) {
                    
    //               var saltRounds = 10;
     
    //              // var hash = bcrypt.hash(password, saltRounds);
     
    //             bcrypt.genSalt(saltRounds, function(err, salt) {
    //                   bcrypt.hash(password, salt, function(err, hash) {
     
    //                    var data = {
    //                         password: hash
    //                     }
     
    //                     connection.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function(err, result) {
    //                         if(err) throw err
                       
    //                     });
     
    //                   });
    //               });
     
    //             type = 'success';
    //             msg = 'Your password has been updated successfully';
                  
    //         } else {
     
    //             console.log('2');
    //             type = 'success';
    //             msg = 'Invalid link; please try again';
     
    //             }
     
    //         req.flash(type, msg);
    //         res.redirect('/');
    //     });
}

exports.checkUserExist = async(req, res) => {
    const user = await authenticationService.isUserExist(req.params.username);

    res.send(!!user);
}