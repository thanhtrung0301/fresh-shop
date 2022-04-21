const { list, getFilterProducts, getFilterSortProducts, getFilterProductsByType, getProductByID, getProductsByName, getSortProductsByName, getProductsByNameType, sortProducts } = require('../models/services/productService');
const Cart = require('../models/cart');
let totalProducts, totalVegetables, totalFruits;

exports.list = async (req, res, next) => {
    res.render('products/list');
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

    
    totalFruits = fruits.length;
    const totalPage = Math.ceil(totalFruits / perPage);
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
        pageCurrent: page,
        totalProducts,
        totalFruits,
        totalVegetables
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

    
    totalVegetables = vegetables.length;
    const totalPage = Math.ceil(totalVegetables / perPage);
   
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
        pageCurrent: page,
        totalProducts,
        totalVegetables,
        totalFruits
    });
}

exports.wishList = (req, res, next) => {
    res.render('products/wish-list');
}

exports.cart = (req, res, next) => {
    if(!req.session.cart)
        return res.render('products/cart', {products: null});
    const cart = new Cart(req.session.cart);

    res.render('products/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
}

exports.checkout = (req, res, next) => {
    if(!req.session.cart)
        return res.render('products/cart', {products: null});
    
    if(!req.user) {
        res.redirect('/login');
    }
    else {
        const cart = new Cart(req.session.cart);

        res.render('products/checkout', {products: cart.generateArray(), totalPrice: cart.totalPrice});
    }
    
}

exports.detail = async (req, res, next) => {
    const product = await getProductByID(req.params.productId);

    res.render('products/product-detail', {products: product, image: product.image, name: product.name, price: product.price, description: product.description});
}


exports.filterProducts = async(req, res) => {
    const products = await getFilterProducts(parseInt(req.params.priceStart), parseInt(req.params.priceEnd));

    res.send(products);
}

exports.filterSortAscProducts = async(req, res) => {
    let products = await getFilterSortProducts(parseInt(req.params.priceStart), parseInt(req.params.priceEnd));
   
    res.send(products);
}

exports.filterSortDescProducts = async(req, res) => {
    let products = await getFilterSortProducts(parseInt(req.params.priceStart), parseInt(req.params.priceEnd));

    res.send(products.reverse());
}


exports.filterProductsByType = async(req, res) => {
    const products = await getFilterProductsByType(parseInt(req.params.priceStart), parseInt(req.params.priceEnd), req.params.category);

    res.send(products);
}


exports.searchProducts = async(req, res) => {
    let payload = req.params.value.trim();
    let products;

    if(payload === 'all') 
        products = await list();
    else 
        products = await getProductsByName(payload);

    res.send(products)
}

exports.searchSortAscProducts = async(req, res) => {
    let payload = req.params.value.trim();
    let products;

    if(payload === 'all') 
        products = await sortProducts();
    else
        products = await getSortProductsByName(payload);

    res.send(products)
}

exports.searchSortDescProducts = async(req, res) => {
    let payload = req.params.value.trim();
    let products;

    if(payload === 'all') 
        products = await sortProducts();
    else
        products = await getSortProductsByName(payload);

    res.send(products.reverse());
}



exports.searchProductsType = async(req, res) => {
    const payload = req.params.value.trim();
    const type = req.params.category.trim();
    let products;

    if(payload === 'all') 
        products = await list();
    else 
        products = await getProductsByNameType(payload, type);

    console.log(products);
    res.send(products)
}

exports.sortAscProducts = async(req, res) => {
    const products = await sortProducts();

    res.send(products)
}

exports.sortDescProducts = async(req, res) => {   
    const products = await sortProducts();

    res.send(products.reverse())
}

exports.listProducts = async(req, res) => { 
    const products = await list();

    res.send(products)
}



// Cart Management
exports.addToCart = async(req, res) => {
    const product = await getProductByID(req.params.productId);
    const cart = new Cart(req.session.cart ? req.session.cart : {});
   
    cart.add(product, req.params.productId);
    req.session.cart = cart;
    res.redirect('back');
}

exports.removeFromCart = async(req, res) => {
    const cart = new Cart(req.session.cart);
   
    cart.remove(req.params.productId);
    req.session.cart = cart;
    console.log(cart);
    res.redirect('/products/cart');
}

exports.updateCart = async(req, res) => {
    const cart = new Cart(req.session.cart);

    cart.update(req.params.productId, parseInt(req.params.qty));
    req.session.cart = cart;
    console.log(cart);

    res.redirect('/products/cart');
}