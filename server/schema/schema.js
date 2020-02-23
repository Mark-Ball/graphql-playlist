const graphql = require('graphql');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

// dummy data
const books = [
    { id: '1', name: 'Name of the Wind', genre: 'Fantasy' },
    { id: '2', name: 'The Final Empire', genre: 'Fantasy' },
    { id: '3', name: 'The Long Earth', genre: 'Sci-Fi' }
];

const authors = [
    { id: '1', name: 'Patrick Rothfuss', age: 44 },
    { id: '2', name: 'Brandon Sanderson', age: 42},
    { id: '3', name: 'Terry Pratchett', age: 66 }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                // use the id on args to return the book object
                const { id } = args;
                for (book of books) {
                    if (id === book.id) {
                        return book;
                    }
                }
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // find author based on id
                const { id } = args;
                for (author of authors) {
                    if (id === author.id) {
                        return author;
                    }
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});