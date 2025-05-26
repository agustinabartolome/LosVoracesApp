const SchoolSupply = require('../../../model/SchoolSupply');

describe('SchoolSupply Model Test', () => {
    let testSupply;
    const supplyData = {
        supplyId: 'supply123',
        name: 'Lápiz 2B',
        price: 2.99,
        section: 'Útiles de escritura',
        stock: 50,
        brand: 'Faber-Castell',
        description: 'Lápiz de grafito para dibujo profesional'
    };

    beforeEach(() => {
        testSupply = new SchoolSupply(
            supplyData.supplyId,
            supplyData.name,
            supplyData.price,
            supplyData.section,
            supplyData.stock,
            supplyData.brand,
            supplyData.description
        );
    });

    describe('SchoolSupply Creation', () => {
        test('should create a valid school supply instance', () => {
            expect(testSupply).toBeInstanceOf(SchoolSupply);
            expect(testSupply.productId).toBe(supplyData.supplyId);
            expect(testSupply.name).toBe(supplyData.name);
            expect(testSupply.category).toBe('util escolar');
            expect(testSupply.price).toBe(supplyData.price);
            expect(testSupply.section).toBe(supplyData.section);
            expect(testSupply.stock).toBe(supplyData.stock);
            expect(testSupply.brand).toBe(supplyData.brand);
            expect(testSupply.description).toBe(supplyData.description);
        });

        test('should have all required properties accessible', () => {
            expect(testSupply).toHaveProperty('price');
            expect(testSupply).toHaveProperty('section');
            expect(testSupply).toHaveProperty('stock');
            expect(testSupply).toHaveProperty('brand');
            expect(testSupply).toHaveProperty('description');
        });

        test('should create supply with empty description', () => {
            const supplyWithoutDesc = new SchoolSupply(
                supplyData.supplyId,
                supplyData.name,
                supplyData.price,
                supplyData.section,
                supplyData.stock,
                supplyData.brand
            );
            expect(supplyWithoutDesc.description).toBe('');
        });
    });

    describe('Input Validation', () => {
        test('should not create supply with missing required properties', () => {
            expect(() => {
                new SchoolSupply(
                    supplyData.supplyId,
                    supplyData.name,
                    supplyData.price,
                    supplyData.section,
                    supplyData.stock,
                    null // missing brand
                );
            }).toThrow('SchoolSupply must have all required properties');
        });

        test('should not accept negative price', () => {
            expect(() => {
                new SchoolSupply(
                    supplyData.supplyId,
                    supplyData.name,
                    -10,
                    supplyData.section,
                    supplyData.stock,
                    supplyData.brand
                );
            }).toThrow('Price must be a positive number');
        });

        test('should not accept negative stock', () => {
            expect(() => {
                new SchoolSupply(
                    supplyData.supplyId,
                    supplyData.name,
                    supplyData.price,
                    supplyData.section,
                    -1,
                    supplyData.brand
                );
            }).toThrow('Stock must be a positive number');
        });

        test('should validate description type', () => {
            expect(() => {
                new SchoolSupply(
                    supplyData.supplyId,
                    supplyData.name,
                    supplyData.price,
                    supplyData.section,
                    supplyData.stock,
                    supplyData.brand,
                    123 // invalid description type
                );
            }).toThrow('Description must be a string');
        });
    });

    describe('Stock Management', () => {
        test('should update stock correctly', () => {
            const initialStock = testSupply.stock;
            testSupply.updateStock(5);
            expect(testSupply.stock).toBe(initialStock + 5);
        });

        test('should decrease stock correctly', () => {
            const initialStock = testSupply.stock;
            testSupply.updateStock(-3);
            expect(testSupply.stock).toBe(initialStock - 3);
        });

        test('should not allow stock to go negative', () => {
            expect(() => {
                testSupply.updateStock(-100);
            }).toThrow('Stock cannot be negative');
        });

        test('should validate quantity type', () => {
            expect(() => {
                testSupply.updateStock('5');
            }).toThrow('Quantity must be a number');
        });
    });

    describe('Property Immutability', () => {
        test('should not allow direct property modification', () => {
            const originalPrice = testSupply.price;
            const originalStock = testSupply.stock;
            const originalBrand = testSupply.brand;
            const originalDescription = testSupply.description;

            // Attempt to modify properties
            testSupply.price = 0;
            testSupply.stock = -1;
            testSupply.brand = 'New Brand';
            testSupply.description = 'New Description';

            // Properties should retain their original values
            expect(testSupply.price).toBe(originalPrice);
            expect(testSupply.stock).toBe(originalStock);
            expect(testSupply.brand).toBe(originalBrand);
            expect(testSupply.description).toBe(originalDescription);
        });
    });
});
