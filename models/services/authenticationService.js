const bcrypt = require('bcryptjs');
const {db} = require('../db');

exports.register = (username, password, c_password, firstname, lastname, address, phonenumber, email, avatar) => {
   const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(password, salt);
   console.log(hash);

   const myobj = {username, password:hash, firstname, lastname, address, phonenumber, email, avatar};
    
   db().collection('user').insertOne(myobj, (err, res) => {
      if (err) throw err;
      console.log("1 document inserted");
   });
}

exports.verifyUser = async (username, password) => {
    const user = await db().collection('user').findOne({username});

    if(!user)
        return false;

    console.log(user.password);

    if(bcrypt.compareSync(password, user.password)) {
        console.log(user);
        return user;
    }
    return false;
}


exports.updateInfoUser = async (username, firstname, lastname, address, phonenumber, email) => {
    console.log(username, firstname, lastname, address);
    
    const newInfo = {$set: {firstname, lastname, address, phonenumber, email}}
    await db().collection('user').updateOne({username}, newInfo, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
    return await db().collection('user').findOne({username})
}

exports.updateAvatar = async (username, avatar) => {
    console.log(avatar);
    console.log(username);
    
    const newInfo = {$set: {avatar}}
    await db().collection('user').updateOne({username}, newInfo, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
}


exports.isUserExist = async (username) => {
    return await db().collection('user').findOne({username}) ? true : null;
}
