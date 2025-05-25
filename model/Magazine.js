const Product = require('./Product');

class Magazine extends Product{

    constructor(magazineId, name, price, issn, number, section, date, stock, issueNumber){
    super(magazineId, name, 'Magazine');
            this.magazineId = magazineId;
            this.name = name;      
            this.issn = issn;
            this.section = section;
            this.price = price;
            this.stock = stock;
            this.date = date;
            this.number = number;
            this.issueNumber = issueNumber;
    
        }
}

module.exports = Magazine;