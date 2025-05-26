const { updateStock } = require('../../../../model/helpers/stockHelper');

describe('Stock Helper', () => {
    describe('updateStock', () => {
        test('should increase stock correctly', () => {
            expect(updateStock(10, 5)).toBe(15);
        });

        test('should decrease stock correctly', () => {
            expect(updateStock(10, -3)).toBe(7);
        });

        test('should not allow negative resulting stock', () => {
            expect(() => {
                updateStock(10, -15);
            }).toThrow('Stock cannot be negative');
        });

        test('should validate quantity type', () => {
            expect(() => {
                updateStock(10, '5');
            }).toThrow('Quantity must be a number');
        });

        test('should handle zero quantity', () => {
            expect(updateStock(10, 0)).toBe(10);
        });

        test('should handle exact zero result', () => {
            expect(updateStock(10, -10)).toBe(0);
        });
    });
});
