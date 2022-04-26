const {db, ObjectId} = require('../db');

exports.insertReview = (review) => {
    review.user.userID = ObjectId(review.userID);
    review.productID = ObjectId(review.productID);
    db().collection('review').insertOne(review, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
     });
}


exports.getReviewtByProductID = async (productID) => {
    return await db().collection('review').find({productID: ObjectId(productID)}).toArray();
}