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
    displayBooks() {
        let { data, loading } = this.props;
        console.log(data);

        if (loading) {
            return <div>Loading...</div>
        } else {
            return data.books.map(book => {
                return (
                    <li>{book.name}</li>
                )
            })
        }
    }

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