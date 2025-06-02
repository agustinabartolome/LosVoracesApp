const Product = require('../../../model/Product');

describe('Product Model Test', () => {
    let testProduct;
    const productData = {
        productId: '123',
        name: 'Test Product',
        category: 'Test Category'
    };

    beforeEach(() => {
        testProduct = new Product(
            productData.productId,
            productData.name,
            productData.category
        );
    });

    describe('Product Creation', () => {
        test('should create a valid product instance', () => {
            expect(testProduct).toBeInstanceOf(Product);
            expect(testProduct.productId).toBe(productData.productId);
            expect(testProduct.name).toBe(productData.name);
            expect(testProduct.category).toBe(productData.category);
        });

        test('should have all required properties accessible', () => {
            expect(testProduct).toHaveProperty('productId');
            expect(testProduct).toHaveProperty('name');
            expect(testProduct).toHaveProperty('category');
        });
    });

    describe('Product Properties', () => {
        test('should not allow direct property modification', () => {
            const originalId = testProduct.productId;
            const originalName = testProduct.name;
            const originalCategory = testProduct.category;

            // Attempt to modify properties
            testProduct.productId = 'new-id';
            testProduct.name = 'new-name';
            testProduct.category = 'new-category';

            // Properties should retain their original values
            expect(testProduct.productId).toBe(originalId);
            expect(testProduct.name).toBe(originalName);
            expect(testProduct.category).toBe(originalCategory);
        });
    });

    describe('Input Validation', () => {
        test('should not create product with empty productId', () => {
            expect(() => {
                new Product('', productData.name, productData.category);
            }).toThrow();
        });

        test('should not create product with empty name', () => {
            expect(() => {
                new Product(productData.productId, '', productData.category);
            }).toThrow();
        });

        test('should not create product with empty category', () => {
            expect(() => {
                new Product(productData.productId, productData.name, '');
            }).toThrow();
        });
    });
});
