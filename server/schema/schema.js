const graphql = require('graphql');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
const books = [
    { id: '1', name: 'Name of the Wind', genre: 'Fantasy', authorId: '1' },
    { id: '2', name: 'The Final Empire', genre: 'Fantasy', authorId: '2' },
    { id: '3', name: 'The Long Earth', genre: 'Sci-Fi', authorId: '3' },
    { id: '4', name: 'The Hero of Ages', genre: 'Fantasy', authorId: '2'},
    { id: '5', name: 'The Colour of Magic', genre: 'Fantasy', authorId: '3'},
    { id: '6', name: 'The Light Fantastic', genre: 'Fantasy', authorId: '3'}
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
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                for (author of authors) {
                    if (authorId === author.id) {
                        return author;
                    }
                }
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.authorId == parent.id);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
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
        // can we write a query for all books?
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});