const {db} = require('../db');

exports.list = async () => {
    return await db().collection('products').find().toArray();
}

