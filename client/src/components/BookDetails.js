import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
    state = {
        bookName: '',
        bookAuthor: '',
        authorName: ''
    };

    render() {
        const { loading, book } = this.props.data;

        return (
            <>
                {loading
                ?
                <p>Loading...</p>
                :
                <div id='book-details'>
                    <h2>{book.name}</h2>
                    <p>{book.id}</p>
                    <p>{book.genre}</p>
                    <p>Author: {book.author.name}</p>
                    <p>Other books by this author</p>
                    <ul>
                        {book.author.books.map(book => <li key={book.id}>{book.name}</li>)}
                    </ul>
                </div>
                }
            </>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);