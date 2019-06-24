const request = require('supertest');
const app = require('../app.js');
const handleResponse = require('./checkspell').handleResponse;

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/').expect(200);
        
    });
});
describe('Spellcheck API',() => {
    test('It should response the POST method', async () => {
        const response = await request(app).post('/api/tamil/spell-check')
            .send('action=vaani&tamilwords=அவரிடமிருந்து|உற்சாகமாகப்|பதில்கள்|வருகின்றன|அரஙகேறி|முடிந்துள்ள|நிலையில்').expect(200);
        expect((response.body)).toEqual([{ word: 'அரஙகேறி', suggestions: 'அரங்கேறி' }]);
    });
    test('handleResponse',() => {
        const data = `[
            {
                "Flag": true,
                "Solspan": 1,
                "Userword": "வருகின்றன",
                "Suggestions": ""
            }
        ]`;
        const result = handleResponse(data);
        expect(result).toEqual([]);
    })
});