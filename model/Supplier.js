class Supplier{

    constructor(supplierId, name, phoneNumber, email, category, catalog){
        this.supplierId = supplierId;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.category = category;
        this.catalog = catalog;
    }
}

module.exports = Supplier;