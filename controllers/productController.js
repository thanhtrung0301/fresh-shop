const { list } = require('../models/services/productService');


exports.list = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 9;
    const start = (page - 1) * perPage;
    const end = page * perPage;

    const count = (await list()).length;
    const totalPage = Math.ceil(count / perPage);
    let pagePrev = page - 1;
    let pageNext = page + 1;
    if(pageNext > totalPage)
        pageNext = totalPage;
    else if(pagePrev < 1)
        pagePrev = 1;

    const products = (await list()).slice(start, end);

    res.render('products/list', { 
        products, perPage, totalPage,
        pages: Array.from(Array(totalPage).keys()).map(i => i+1),
        pagePrev, pageNext,
        pageCurrent: page
    });
}

exports.listFruit = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 9;
    const start = (page - 1) * perPage;
    const end = page * perPage;

    const products = (await list());
    let fruits = products.filter((item) => {
        return item.category === 'Trái cây';
    })

    
    const count = fruits.length;
    const totalPage = Math.ceil(count / perPage);
    let pagePrev = page - 1;
    let pageNext = page + 1;
    if(pageNext > totalPage)
        pageNext = totalPage;
    else if(pagePrev < 1)
        pagePrev = 1;

    fruits = fruits.slice(start, end);

    res.render('products/listFruit', {
        fruits, perPage, totalPage,
        pages: Array.from(Array(totalPage).keys()).map(i => i+1),
        pagePrev, pageNext,
        pageCurrent: page
    });
}

exports.listVegetables = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 9;
    const start = (page - 1) * perPage;
    const end = page * perPage;

    const products = (await list());
    let vegetables = products.filter((item) => {
        return item.category === 'Rau củ';
    })

    
    const count = vegetables.length;
    const totalPage = Math.ceil(count / perPage);
   
    let pagePrev = page - 1;
    let pageNext = page + 1;
    if(pageNext > totalPage)
        pageNext = totalPage;
    else if(pagePrev < 1)
        pagePrev = 1;

    vegetables = vegetables.slice(start, end);
    
    res.render('products/listVegetables', {
        vegetables, perPage, totalPage,
        pages: Array.from(Array(totalPage).keys()).map(i => i+1),
        pagePrev, pageNext,
        pageCurrent: page
    });
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

exports.detail = async (req, res, next) => {
    const productID = parseInt(req.params.productId);
    const products = await list();
    const productDetail = products[productID - 1];

    res.render('products/product-detail', {products, image:productDetail.image, name:productDetail.name, price:productDetail.price});
}