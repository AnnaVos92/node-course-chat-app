const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        expect(isRealString(1)).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        expect(isRealString('   ')).toBeFalsy();
    });
    
    it('should accept a valid string input', () => {
        expect(isRealString('hi ')).toBeTruthy();
    });
});