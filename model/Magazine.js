class Magazine extends Product{

    constructor(magazineId, name, price, issn, number, section, date, stock, issueNumber){
    super(productId, name, category);
            this.magazineId = magazineId;
            this.name = name;      
            this.issn = issn;
            this.section = section;
            this.price = price;
            this.stock = stock;
            this.date = date;
            this.issueNumber = issueNumber;
    
        }
    }