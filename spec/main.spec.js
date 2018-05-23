process.env.NODE_ENV = 'test';

const app = require('../server');
const mongoose = require('mongoose');
const request = require('supertest')(app);

const { expect } = require('chai');
const { seedDB } = require('../seeds/seed');

const { usersData, topicsData, articlesData, commentsData } = require('../seeds/testData');

describe('API endpoints', () => {
  // docs will be some of the seeded data for you to use throughout your test suite
  let  userDocs, topicDocs, articleDocs, commentDocs;

  before(() => {
    return seedDB(userDocs, topicDocs, articleDocs, commentDocs)
      .then(data => {[commentDocs, articleDocs, topicDocs, userDocs] = data
      })
  })

  after(() => {
    mongoose.disconnect();
  })

  describe('testing topics on the API', () => {
    it('gets all topics', () => {
      return request
        .get('/api/topics')
          .then(res => {
            expect(res.body.topics.length).to.equal(2);
            expect(res.body.topics[0].title).to.equal('Mitch');
            expect(res.body.topics[res.body.topics.length - 1].title).to.equal('Cats');
          })
    });

    it('gets all articles for a topic', () => {
      return request
        .get(`/api/topics/${topicDocs[0]._id}/articles`)
          .then(res => {
            console.log(articleDocs);
            expect(res.body.articles.length).to.equal(2);
            expect(res.body.articles[0].title).to.equal('Living in the shadow of a great man');
            expect(res.body.articles[res.body.articles.length - 1].title).to.equal('7 inspirational thought leaders from Manchester UK');
          })
    });



  });
});