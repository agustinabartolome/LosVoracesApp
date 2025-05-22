const Product = require('./Product');
class SchoolSupply extends Product{

    constructor(supplyId, name, price, section, stock, brand, description) {
        super(supplyId, name, 'Util Escolar');
        this.supplyId = supplyId;
        this.name = name;
        this.price = price;
        this.section = section;
        this.stock = stock; 
        this.brand = brand;
        this.description = description;
    }
}

module.exports = SchoolSupply;
