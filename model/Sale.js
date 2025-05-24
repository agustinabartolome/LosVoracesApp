class Sale{

    constructor(saleId, product, date, description, category, price, quantityProduct, total){
        this.saleId = saleId;
        this.product = product;
        this.date = date;
        this.description = description;
        this.category = category;
        this.price = price;
        this.quantityProduct = quantityProduct;
        this.total = total;
    }
}

module.exports = Sale;