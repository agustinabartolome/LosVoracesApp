class Order{

    constructor(orderId, supplierId, product, date, description, category, price, quantityProduct, status, total){
        this.orderId = orderId;
        this.supplierId = supplierId;
        this.product = product;
        this.date = date;
        this.description = description;
        this.category = category;
        this.price = price;
        this.quantityProduct = quantityProduct;
        this.status = status;
        this.total = total;
    }
}

module.exports = Order;