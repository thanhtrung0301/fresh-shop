const { list, getFilterProducts, getFilterSortProducts, getFilterProductsByType, getProductByID, getProductsByName, getSortProductsByName, getProductsByNameType, sortProducts } = require('../models/services/productService');
const Cart = require('../models/cart');
const orderService = require('../models/services/orderService');
const reviewService = require('../models/services/reviewService');
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
    const productsRelate = await getFilterProductsByType(0, 1000, product.category);

    res.render('products/product-detail', {products: productsRelate, image: product.image, name: product.name, price: product.price, description: product.description, productID: product._id});
}


exports.leaveReview = async(req, res) => {
    console.log(req.body.productID);
    console.log(req.body.review);

    const review = {user: {userID: req.user._id, avatar: req.user.avatar, name: req.user.firstname+' '+req.user.lastname}, productID: req.body.productID, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), content: req.body.review};
    reviewService.insertReview(review);

    res.redirect('back');
}

exports.listReviews = async(req, res) => { 
    const reviews = await reviewService.getReviewtByProductID(req.params.productID);

    res.send(reviews);
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

// Paypal Method
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AcmhOiTT9prOcgeATMhMCMmvIDK_NQB5a909u1vyQD38FeU7GSWoeaPnI__6EfynRdNjLpCojNupYu_G',
    'client_secret': 'EMxkAo4ioZwVydAHeDba-AxS-IRZQFksGyqK3LA3HBOA68e1BnAehjJ1Rx_VozgHVEP0GVbV6924wj2Q'
});

exports.payPal = (req, res) => {
    const total = req.session.cart.totalPrice;
    const products = req.session.cart.items;
    const list = Object.keys(products).map((index) => {
       return {name: products[index].item.name, sku: products[index].item._id, price: products[index].item.price, currency: 'USD', quantity: products[index].qty};
    })

    console.log(list);
    console.log(total);

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://172.104.33.240:3000/products/pay/success",
            "cancel_url": "http://172.104.33.240:3000/products/pay/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": list
            },
            "amount": {
                "currency": "USD",
                "total": total
            },
            "description": "PayPal Payment"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }

        }
    });
}

exports.payPalSuccess = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": req.session.cart.totalPrice
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            const order = {userID: req.user._id, placeOn:{date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString()}, payment: {type: 'PayPal', payerID: payerId, paymentID: paymentId}, paymentStatus: 'Completed', status: 'Shipping', amount: req.session.cart.totalPrice, items: req.session.cart.items};
            orderService.insertOrder(order);
            
            const cart = new Cart({});
            req.session.cart = cart;

            res.send('Mua hàng thành công...');
        }
    });
}


exports.payPalCancel = (req, res) => {
    res.send('Đơn hàng đã hủy !!!');
}
