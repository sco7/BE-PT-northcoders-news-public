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

  describe('tests the topics controller on the API', () => {
    it('gets all topics', () => {
      return request
        .get('/api/topics')
          .then(({body: {topics}}) => {
            expect(topics.length).to.equal(2);
            expect(topics[0].title).to.equal('Mitch');
            expect(topics[topics.length - 1].title).to.equal('Cats');
          })
    });

    it('gets all articles relating to a topic', () => {
      return request
        .get(`/api/topics/${topicDocs[0]._id}/articles`)
          .then(res => {
            expect(res.body.articles.length).to.equal(2);
            expect(res.body.articles[0].title).to.equal('Living in the shadow of a great man');
            expect(res.body.articles[res.body.articles.length - 1].title).to.equal('7 inspirational thought leaders from Manchester UK');
          })
    });

    it('sends an error message when the article id cannot be found during a get all articles relating to a topic request', () => {
      return request
        .get(`/api/topics/AAA12345/articles`)
          .then(res => {
            expect(res.body.err).to.equal(`Article with topic Id 'AAA12345' could not be found`);
          })
    });

    it('posts an article to a topic', () => {
     // const article = 
      return request
        .post(`/api/topics/${topicDocs[0]._id}/articles`)
          .send({ "title": "this is my new article title", "body": "This is my new article content" })
            .then(res => {
            expect(res.body.article.title).to.equal('this is my new article title')
          })
    });

    it('sends an error message when the relating topic id cannot be found during a post an article to a topic request', () => {
      return request
        .post(`/api/topics/BBB12345/articles`)
          .send({ "title": "this is another new article title", "body": "This is another new article content" })
            .then(res => {
            expect(res.body.err).to.equal('Unable to post a new article, relating topic not found')
          })
    });
  });

  describe('tests the users controller on the API', () => {
    it('gets all users', () => {
      return request
        .get('/api/users')
          .then(res => {
            expect(res.body.users.length).to.equal(2);
            expect(res.body.users[0].name).to.equal('jonny');
            expect(res.body.users[res.body.users.length - 1].name).to.equal('mitch');
          })
    });

    it('gets user profile', () => {
      return request
        .get('/api/users/butter_bridge')
          .then(res => {
            expect(res.body.users.length).to.equal(1);
            expect(res.body.users[0].name).to.equal('jonny');
            expect(res.body.users[0]).to.have.any.key('avatar_url');
          })
    });

    it('sends an error message when the user profile cannot be found during a get user profile request', () => {
      return request
        .get('/api/users/missingUser')
          .then(res => {
            expect(res.body.err).to.equal(`User with username 'missingUser' could not be found`);
          })
    });
  });

  describe('tests the articles controller on the API', () => {
    it('gets all topics', () => {
      return request
        .get('/api/articles/')
          .then(res => {
            expect(res.body.articles.length).to.equal(5);
            expect(res.body.articles[0].title).to.equal('Living in the shadow of a great man');
            expect(res.body.articles[res.body.articles.length - 1].title).to.equal('this is my new article title');
          })
    });

    it('gets article by id', () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
          .then(res => {
            expect(res.body.articles.title).to.equal('Living in the shadow of a great man');
            expect(res.body.articles).to.have.any.key('belongs_to');
            expect(res.body.articles).to.have.any.key('created_by');
            // to.have.all.keys([''])
          })
    });

    it('sends an error message when the article id cannot be found during a get articles by id', () => {
      return request
        .get(`/api/articles/AAA12345/`)
          .then(res => {
            expect(res.body.err).to.equal(`Article with Id 'AAA12345' could not be found`);
          })
    });

    it('gets all comments relating to a article', () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
          .then(res => {
            expect(res.body.comments[0].votes).to.equal(7);
            expect(res.body.comments[0]).to.have.any.key('belongs_to');
            expect(res.body.comments[0]).to.have.any.key('created_by');
            expect(res.body.comments[0]).to.have.any.key('body');
          })
    });

    it('sends an error message when the article id cannot be found during a get all articles relating to a topic request', () => {
      return request
        .get(`/api/articles/AAA12345/comments`)
          .then(res => {
            expect(res.body.err).to.equal(`Comments with article Id 'AAA12345' could not be found`);
          })
    });

    it('posts an comment to an article', () => {
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
          .send({ "comment": "This is my new comment" })
            .then(res => {
            expect(res.body.comment.body).to.equal('This is my new comment')
          })
    });

    it('sends an error message when the relating article id cannot be found during a posts a comment to a article request', () => {
      return request
        .post(`/api/articles/BBB12345/comments`)
          .send({ "comment": "This is another new comment" })
            .then(res => {
            expect(res.body.err).to.equal('Unable to post a new comment, relating article not found')
          })
    });

    it('puts a increment to a vote on an article', () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=up`)
          .then(res => {
            expect(res.body.article.votes).to.equal(1);
          })
    });

    it('puts a decrement to a vote on an article', () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=down`)
          .then(res => {
            // reduces the previous increment by 1 back to 0
            expect(res.body.article.votes).to.equal(0);
          })
    });

    it('sends an error message when the article id cannot be found during a put decrement vote request', () => {
      return request
        .put(`/api/articles/BBB12345/?vote=down`)
          .then(res => {
            //console.log(res.body.err);
            expect(res.body.err).to.equal('unable to update the vote, relating article not found')
          })
    });
  });

  describe('tests the comments controller on the API', () => {
    it('gets all comments', () => {
      return request
        .get('/api/comments/')
          .then(res => {
            //console.log(res.body.comments);
            expect(res.body.comments.length).to.equal(9);
            expect(res.body.comments[0].votes).to.equal(7);
            expect(res.body.comments[res.body.comments.length - 1].votes).to.equal(0);
          })
    });

    it('deletes comments by id', () => {
      return request
        .delete(`/api/comments/${commentDocs[0]._id}`)
          .then(res => {
            //console.log(commentDocs.length);
            expect(res.text).to.equal(`Comment with Id '${commentDocs[0]._id}' has been removed from the db`);
            expect(res.statusCode).to.equal(200);
            expect(commentDocs.length).to.equal(8);
          })
    });

    it('sends an error message when the comments id cannot be found during a delete comments by id request', () => {
      return request
        .delete(`/api/comments/AAA12345/`)
          .then(res => {
            expect(res.body.err).to.equal(`Comment with Id 'AAA12345' could not be found`);
            expect(commentDocs.length).to.equal(8);
          })
    });
  });
});
