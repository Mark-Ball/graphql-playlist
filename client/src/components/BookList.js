import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
    state = {
        bookId: null
    };
    
    handleClick = bookId => {
        return () => {
            this.setState({ bookId });
        };
    };

    render() {
        // nested destructuring, equivalent to:
        // const { data } = this.props;
        // const { books, loading } = data;
        const { books, loading } = this.props.data;
        const { bookId } = this.state;

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
                    books.map(book => 
                        <li onClick={this.handleClick(book.id)} key={book.id}>
                            {book.name}
                        </li>)
                    }
                </ul>
                {bookId && <BookDetails bookId={bookId} />}
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);