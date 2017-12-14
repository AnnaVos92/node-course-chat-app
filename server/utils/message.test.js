const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate a correct message object', () => {
        var from = 'from input';
        var text = 'text input'

        var generatedMessage = generateMessage(from, text);

        expect(generatedMessage.from).toBe(from);
        expect(generatedMessage.text).toBe(text);
        expect(typeof(generatedMessage.createdAt)).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate a valid location object', () => {
        var from = 'name';
        var lat = 1;
        var lng = 2;
        var url = `https://www.google.com/maps/search/${lat},+${lng}`;

        var generatedMessage = generateLocationMessage(from, lat, lng);
        
        expect(generatedMessage.from).toBe(from);
        expect(generatedMessage.url).toBe(url);
        expect(generatedMessage).toMatchObject({from, url});
        expect(typeof(generatedMessage.createdAt)).toBe('number');
    });
})