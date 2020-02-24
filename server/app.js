const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const schema = require('./schema/schema');
const dbConnect = require('./database/connect');
const BookModel = require('./database/models/bookModel');

const app = express();

dbConnect('mongodb://localhost/graphql-playlist');

// allow cross-origin requests
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => console.log('Listening on port 4000'));
