const express = require('express');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');
// DB config
const db = require('./config/keys').mongoURI;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Connect to database
mongoose.connect(db,{ useNewUrlParser: true }).then(() =>
  console.log('database connected successfully')
).catch((err) =>
  console.log(err)
);


//passport start middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server running port ${port}`));
