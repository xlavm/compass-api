const { getPosts } = require('../services/posts');
const axios = require('axios');
jest.mock('axios');

beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2);
});

afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
});

describe('getPosts', () => {
    it('happy path', () => {
        axios.get.mockResolvedValue({
            'message': [
                'https://images.dog.ceo/breeds/terrier-australian/n02096294_5774.jpg',
            ],
            'status': 'success'
        });
        getPosts('test /posts')
            .then(response =>{
                expect(response.data.message.length).toEqual(1);
            });
    });
});