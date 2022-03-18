exports.list = (req, res, next) => {
    res.render('products/list');
}

exports.wishList = (req, res, next) => {
    res.render('products/wish-list');
}

exports.cart = (req, res, next) => {
    res.render('products/cart');
}

exports.checkout = (req, res, next) => {
    res.render('products/checkout');
}

exports.detail = (req, res, next) => {
    res.render('products/product-detail');
}