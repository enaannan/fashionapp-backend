const math = require('../math');
const assert = require('assert');

describe('math.js tests', () => {
    describe('math.add() Test', () => {
        it('should equal 2', () => {
            const result = math.add(1, 1);
            assert.equal(result, 2);
        });
        it('should equal 4', () => {
            const result = math.add(2, 2);
            assert.equal(result, 4);
        });
    });
    
    describe('math.multiply() Test', () => {
        it('should equal 3', () => {
            const result = math.multiply(3, 1);
            assert.equal(result, 3);
        });
        it('should equal 10', () => {
            const result = math.multiply(5, 2);
            assert.equal(result, 10);
        });
    });
});