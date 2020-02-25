import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

class BookList extends Component {
    render() {
        // nested destructuring, equivalent to:
        // const { data } = this.props;
        // const { books, loading } = data;
        const { data: { books }, data: { loading } } = this.props;

        return (
            <div>
                <ul id='book-list'>
                    {loading
                    ?
                    <div>Loading...</div>
                    :
                    books.map(book => <li key={book.id}>{book.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);