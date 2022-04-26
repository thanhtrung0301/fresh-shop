const {db, ObjectId} = require('../db');

exports.insertOrder = (order) => {
    order.userID = ObjectId(order.userID);
    db().collection('order').insertOne(order, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
     });
}


exports.getOrdertByID = async (userID) => {
    return await db().collection('order').find({userID: ObjectId(userID)}).toArray();
}