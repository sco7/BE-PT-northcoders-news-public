/* eslint-disable no-console */

// for heroku deployment

const app = require('./server');
const PORT = process.env.NODE_ENV === 'production'? process.env.PORT : 3001;

app.listen(PORT, function(err) {
  if (err) return console.log(err);
  console.log(`App listening on port ${PORT}...`);
});
