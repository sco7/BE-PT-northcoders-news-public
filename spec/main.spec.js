process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const seed = require('../seeds/seed');

describe('API endpoints', () => {
  // docs will be some of the seeded data for you to use throughout your test suite
  let docs;
  before(function () {
    // There's a lot of data to seed so we increase the timeout on Mocha
    this.timeout(6000);
    return seed(`mongodb://localhost:27017/northcoders-news-${process.env.NODE_ENV}`)
      .then((docs) => {
        console.log(docs)
      });
  });
  it('', () => {
    console.log(docs);
  });
});

// before : connect
// beforeEach: run seed fn
// after: disconnect