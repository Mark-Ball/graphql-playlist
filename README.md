# GraphQL full course - Notice to Expert

https://www.youtube.com/watch?v=ed8SzALpx1Q

## Making a GQL query on component load

This will make the query when the file runs, as opposed to when an event (e.g. a button click) happens. The data received back from the query will be inside ```this.props```.

1. Import the packages inside the component
    ```Javascript
    import { gql } from 'apollo-boost';
    import { graphql } from 'react-apollo';
    ```

2. Define the query
    ```
    const getBooksQuery = gql`
        {
            books {
                name
                id
            }
        }
    `;
    ```

3. Bind the query to the component in the export line
    ```Javascript
    export default graphql(getBooksQuery)(BookList);
    ```

## Sending a mutation to create a resource

To create a book, we will use the AddBook mutation specified in the server schema.
```
mutation {
    addBook(name: "The Wise Man's Fear", genre: "Fantasy", authorId: "5e52daa67be8e0094e77dec8") {
        name
        genre
        id
        author {
            name
        }
    }
}
```

However to generalise this, we do not want to hard-code in the name, genre, or authorId fields.
```
mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
        name
        genre
        id
        author {
            name
        }
    }
}
```

The query variables need to be passed into the function call as a key called variables on an object.
```Javascript
this.props.addBookMutation({
    variables: {
        name: bookName,
        genre: bookGenre,
        authorId: bookAuthor
    }
});
```

Note: we have added addBookMutation into props in the export statement (compose used because we have two queries).
```Javascript
export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
```