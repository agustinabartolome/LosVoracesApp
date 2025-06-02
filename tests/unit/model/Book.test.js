const Book = require('../../../model/Book');

describe('Book Model Test', () => {
    let testBook;
    const bookData = {
        bookId: 'book123',
        title: 'Test Book',
        isbn: '978-3-16-148410-0',
        price: 29.99,
        author: 'Test Author',
        publisherHouse: 'Test Publisher',
        section: 'Fiction',
        stock: 10,
        literaryGenre: 'Novel'
    };

    beforeEach(() => {
        testBook = new Book(
            bookData.bookId,
            bookData.title,
            bookData.isbn,
            bookData.price,
            bookData.author,
            bookData.publisherHouse,
            bookData.section,
            bookData.stock,
            bookData.literaryGenre
        );
    });

    describe('Book Creation', () => {
        test('should create a valid book instance', () => {
            expect(testBook).toBeInstanceOf(Book);
            expect(testBook.productId).toBe(bookData.bookId);
            expect(testBook.name).toBe(bookData.title);
            expect(testBook.category).toBe('libro');
            expect(testBook.isbn).toBe(bookData.isbn);
            expect(testBook.price).toBe(bookData.price);
            expect(testBook.author).toBe(bookData.author);
            expect(testBook.publisherHouse).toBe(bookData.publisherHouse);
            expect(testBook.section).toBe(bookData.section);
            expect(testBook.stock).toBe(bookData.stock);
            expect(testBook.literaryGenre).toBe(bookData.literaryGenre);
        });

        test('should have all required properties accessible', () => {
            expect(testBook).toHaveProperty('isbn');
            expect(testBook).toHaveProperty('price');
            expect(testBook).toHaveProperty('author');
            expect(testBook).toHaveProperty('publisherHouse');
            expect(testBook).toHaveProperty('section');
            expect(testBook).toHaveProperty('stock');
            expect(testBook).toHaveProperty('literaryGenre');
        });
    });

    describe('Input Validation', () => {
        test('should not create book with missing required properties', () => {
            const invalidData = { ...bookData };
            delete invalidData.isbn;
            
            expect(() => {
                new Book(
                    invalidData.bookId,
                    invalidData.title,
                    invalidData.isbn,
                    invalidData.price,
                    invalidData.author,
                    invalidData.publisherHouse,
                    invalidData.section,
                    invalidData.stock,
                    invalidData.literaryGenre
                );
            }).toThrow('Book must have all required properties');
        });

        test('should not accept negative price', () => {
            expect(() => {
                new Book(
                    bookData.bookId,
                    bookData.title,
                    bookData.isbn,
                    -10,
                    bookData.author,
                    bookData.publisherHouse,
                    bookData.section,
                    bookData.stock,
                    bookData.literaryGenre
                );
            }).toThrow('Price must be a positive number');
        });

        test('should not accept negative stock', () => {
            expect(() => {
                new Book(
                    bookData.bookId,
                    bookData.title,
                    bookData.isbn,
                    bookData.price,
                    bookData.author,
                    bookData.publisherHouse,
                    bookData.section,
                    -1,
                    bookData.literaryGenre
                );
            }).toThrow('Stock must be a positive number');
        });
    });

    describe('Stock Management', () => {
        test('should update stock correctly', () => {
            const initialStock = testBook.stock;
            testBook.updateStock(5);
            expect(testBook.stock).toBe(initialStock + 5);
        });

        test('should decrease stock correctly', () => {
            const initialStock = testBook.stock;
            testBook.updateStock(-3);
            expect(testBook.stock).toBe(initialStock - 3);
        });

        test('should not allow stock to go negative', () => {
            expect(() => {
                testBook.updateStock(-20);
            }).toThrow('Stock cannot be negative');
        });

        test('should validate quantity type', () => {
            expect(() => {
                testBook.updateStock('5');
            }).toThrow('Quantity must be a number');
        });
    });

    describe('Property Immutability', () => {
        test('should not allow direct property modification', () => {
            const originalIsbn = testBook.isbn;
            const originalPrice = testBook.price;
            const originalStock = testBook.stock;

            // Attempt to modify properties
            testBook.isbn = '123-456';
            testBook.price = 0;
            testBook.stock = -1;

            // Properties should retain their original values
            expect(testBook.isbn).toBe(originalIsbn);
            expect(testBook.price).toBe(originalPrice);
            expect(testBook.stock).toBe(originalStock);
        });
    });
});
