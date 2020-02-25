import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
    render() {
        // nested destructuring, equivalent to:
        // const { data } = this.props;
        // const { books, loading } = data;
        const { data: { books }, data: { loading } } = this.props;

        // if data still loading, return a message to say we are loading
        // there is an error if we do not do this because authors is undefined
        // so we cannot map over it
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