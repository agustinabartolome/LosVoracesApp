const Product = require('./Product');

class Book extends Product{

    constructor(bookId, title, isbn, price, author, publisherHouse, section, stock, literaryGenre){
        super(bookId, title, 'libro');
            this.bookId = bookId;
            this.title = title;
            this.author = author;
            this.publisherHouse = publisherHouse;
            this.isbn = isbn;
            this.section = section;
            this.price = price;
            this.stock = stock;
            this.literaryGenre = literaryGenre;
    
        }
    }

    module.exports = Book;