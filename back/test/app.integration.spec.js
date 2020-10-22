const request = require('supertest');
const app = require('../index');

describe('post travel', () => {
  it('POST / post a travel', (done) => {
    request(app)
      .post('/api/travels')
      .send({
        IDuser_creator:2,
        start_date:'2020-09-18',
        destination:'Rome',
        description:'flaner'
      })
      .expect(200)
      //.expect('Content-Type', /json/)
      .then(response => {
        const expected = {
          travelID: expect.any(Number),
          IDuser_creator: 2,
          start_date:'2020-09-17T22:00:00.000Z',
          destination:'Rome',
          description:'flaner',
        };
        expect(response.body).toEqual(expected);
        done();
      });
    });
  })
