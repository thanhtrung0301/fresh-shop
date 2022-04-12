const {db} = require('../db');

exports.list = async () => {
    return await db().collection('products').find().toArray();
}

exports.getFilterProducts = async (priceStart, priceEnd) => {
    return await db().collection('products').find({price: { $gt: priceStart, $lt: priceEnd } }).toArray();
}