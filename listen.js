/* eslint-disable no-console */

const app = require('./server');
const PORT = 3001;

app.listen(PORT, function(err) {
  if (err) return console.log(err);
  console.log(`App listening on port ${PORT}...`);
});

// for heroku deployment
if (process.env.NODE_ENV === 'production') {PORT = process.env.PORT;}