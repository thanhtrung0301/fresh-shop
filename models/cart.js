module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    this.add = function (item, id) {
        let storedItem = this.items[id];
        
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0,  price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.remove = function (id) {
        let storedItem = this.items[id];

        this.totalQty -= storedItem.qty;
        this.totalPrice -= storedItem.item.price * storedItem.qty;
        delete this.items[id];
    };

    this.update = function (id, qty) {
        let storedItem = this.items[id];

        this.totalQty += qty - storedItem.qty;
        this.totalPrice += storedItem.item.price * (qty - storedItem.qty);
       
        if(qty === 0)
            delete this.items[id];
        else {
            this.items[id].qty = qty;
            this.items[id].price = qty * storedItem.item.price;
        }    
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};