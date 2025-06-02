const Magazine = require('../../../model/Magazine');

describe('Magazine Model Test', () => {
    let testMagazine;
    const magazineData = {
        magazineId: 'billiken123',
        name: 'Billiken je',
        price: 9.99,
        issn: '2049-3630',
        number: 42,
        section: 'Science',
        date: new Date('2025-01-01'),
        stock: 100,
        issueNumber: 5
    };

    beforeEach(() => {
        testMagazine = new Magazine(
            magazineData.magazineId,
            magazineData.name,
            magazineData.price,
            magazineData.issn,
            magazineData.number,
            magazineData.section,
            magazineData.date,
            magazineData.stock,
            magazineData.issueNumber
        );
    });

    describe('Magazine Creation', () => {
        test('should create a valid magazine instance', () => {
            expect(testMagazine).toBeInstanceOf(Magazine);
            expect(testMagazine.productId).toBe(magazineData.magazineId);
            expect(testMagazine.name).toBe(magazineData.name);
            expect(testMagazine.category).toBe('revista');
            expect(testMagazine.issn).toBe(magazineData.issn);
            expect(testMagazine.price).toBe(magazineData.price);
            expect(testMagazine.section).toBe(magazineData.section);
            expect(testMagazine.stock).toBe(magazineData.stock);
            expect(testMagazine.date).toBe(magazineData.date);
            expect(testMagazine.number).toBe(magazineData.number);
            expect(testMagazine.issueNumber).toBe(magazineData.issueNumber);
        });

        test('should have all required properties accessible', () => {
            expect(testMagazine).toHaveProperty('issn');
            expect(testMagazine).toHaveProperty('price');
            expect(testMagazine).toHaveProperty('section');
            expect(testMagazine).toHaveProperty('stock');
            expect(testMagazine).toHaveProperty('date');
            expect(testMagazine).toHaveProperty('number');
            expect(testMagazine).toHaveProperty('issueNumber');
        });
    });

    describe('Input Validation', () => {
        test('should not create magazine with missing required properties', () => {
            const invalidData = { ...magazineData };
            delete invalidData.issn;
            
            expect(() => {
                new Magazine(
                    invalidData.magazineId,
                    invalidData.name,
                    invalidData.price,
                    invalidData.issn,
                    invalidData.number,
                    invalidData.section,
                    invalidData.date,
                    invalidData.stock,
                    invalidData.issueNumber
                );
            }).toThrow('Magazine must have all required properties');
        });

        test('should not accept negative price', () => {
            expect(() => {
                new Magazine(
                    magazineData.magazineId,
                    magazineData.name,
                    -10,
                    magazineData.issn,
                    magazineData.number,
                    magazineData.section,
                    magazineData.date,
                    magazineData.stock,
                    magazineData.issueNumber
                );
            }).toThrow('Price must be a positive number');
        });

        test('should not accept negative stock', () => {
            expect(() => {
                new Magazine(
                    magazineData.magazineId,
                    magazineData.name,
                    magazineData.price,
                    magazineData.issn,
                    magazineData.number,
                    magazineData.section,
                    magazineData.date,
                    -1,
                    magazineData.issueNumber
                );
            }).toThrow('Stock must be a positive number');
        });

        test('should not accept invalid number', () => {
            expect(() => {
                new Magazine(
                    magazineData.magazineId,
                    magazineData.name,
                    magazineData.price,
                    magazineData.issn,
                    0,
                    magazineData.section,
                    magazineData.date,
                    magazineData.stock,
                    magazineData.issueNumber
                );
            }).toThrow('Number must be a positive number');
        });

        test('should not accept invalid issue number', () => {
            expect(() => {
                new Magazine(
                    magazineData.magazineId,
                    magazineData.name,
                    magazineData.price,
                    magazineData.issn,
                    magazineData.number,
                    magazineData.section,
                    magazineData.date,
                    magazineData.stock,
                    0
                );
            }).toThrow('Issue number must be a positive number');
        });

        test('should not accept invalid date', () => {
            expect(() => {
                new Magazine(
                    magazineData.magazineId,
                    magazineData.name,
                    magazineData.price,
                    magazineData.issn,
                    magazineData.number,
                    magazineData.section,
                    'invalid-date',
                    magazineData.stock,
                    magazineData.issueNumber
                );
            }).toThrow('Date must be a valid Date object');
        });
    });

    describe('Stock Management', () => {
        test('should update stock correctly', () => {
            const initialStock = testMagazine.stock;
            testMagazine.updateStock(5);
            expect(testMagazine.stock).toBe(initialStock + 5);
        });

        test('should decrease stock correctly', () => {
            const initialStock = testMagazine.stock;
            testMagazine.updateStock(-3);
            expect(testMagazine.stock).toBe(initialStock - 3);
        });

        test('should not allow stock to go negative', () => {
            expect(() => {
                testMagazine.updateStock(-200);
            }).toThrow('Stock cannot be negative');
        });

        test('should validate quantity type', () => {
            expect(() => {
                testMagazine.updateStock('5');
            }).toThrow('Quantity must be a number');
        });
    });

    describe('Property Immutability', () => {
        test('should not allow direct property modification', () => {
            const originalIssn = testMagazine.issn;
            const originalPrice = testMagazine.price;
            const originalStock = testMagazine.stock;
            const originalNumber = testMagazine.number;

            // Attempt to modify properties
            testMagazine.issn = '123-456';
            testMagazine.price = 0;
            testMagazine.stock = -1;
            testMagazine.number = 0;

            // Properties should retain their original values
            expect(testMagazine.issn).toBe(originalIssn);
            expect(testMagazine.price).toBe(originalPrice);
            expect(testMagazine.stock).toBe(originalStock);
            expect(testMagazine.number).toBe(originalNumber);
        });
    });
});
