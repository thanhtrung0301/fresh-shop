const {db, ObjectId} = require('../db');

exports.list = async () => {
    return await db().collection('products').find().toArray();
}

exports.getFilterProducts = async (priceStart, priceEnd) => {
    return await db().collection('products').find({price: { $gt: priceStart, $lt: priceEnd } }).toArray();
}

exports.getFilterSortProducts = async (priceStart, priceEnd) => {
    return await db().collection('products').find({price: { $gt: priceStart, $lt: priceEnd } }).sort({price: 1}).toArray();
}

exports.getFilterProductsByType = async (priceStart, priceEnd, category) => {
    return await db().collection('products').find({price: { $gt: priceStart, $lt: priceEnd }, category }).toArray();
}

exports.getProductByID = async (id) => {
    return await db().collection('products').findOne({_id: ObjectId(id)});
}

exports.getProductsByName = async (name) => {
    return await db().collection('products').find({name: {'$regex' : '^'+name, '$options' : 'i'}}).toArray();
}

exports.getSortProductsByName = async (name) => {
    return await db().collection('products').find({name: {'$regex' : '^'+name, '$options' : 'i'}}).sort({price: 1}).toArray();
}

exports.getProductsByNameType = async (name, category) => {
    return await db().collection('products').find({name: {'$regex' : '^'+name, '$options' : 'i'}, category}).toArray();
}

exports.sortProducts = async () => {
    return await db().collection('products').find().sort({price: 1}).toArray();
}