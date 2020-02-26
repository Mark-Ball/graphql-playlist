import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getAuthorsQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {
    state = {
        bookName: '',
        bookGenre: '',
        bookAuthor: ''
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { bookName, bookGenre, bookAuthor } = this.state;
        this.props.addBookMutation({
            variables: {
                name: bookName,
                genre: bookGenre,
                authorId: bookAuthor
            }
        });
    };

    render() {
        // data on getAuthorsQuery inside props because of multiple gql queries
        // nested destructuring, equivalent to:
        // const { getAuthorsQuery } = this.props;
        // const { authors, loading } = getAuthorsQuery;
        const { getAuthorsQuery: { authors }, getAuthorsQuery: { loading } } = this.props;
        const { bookName, bookGenre, bookAuthor } = this.state;

        // if data still loading, return a message to say we are loading
        // there is an error if we do not do this because authors is undefined
        // so we cannot map over it
        return (
            <>
                {loading
                ?
                <div>Loading...</div>
                :
                <form id='add-book' onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label>Book name:</label>
                        <input 
                            type='text' 
                            name='bookName' 
                            onChange={this.handleChange} 
                            value={bookName} 
                        />
                    </div>
                    <div className='field'>
                        <label>Genre:</label>
                        <input 
                            type='text' 
                            name='bookGenre' 
                            onChange={this.handleChange} 
                            value={bookGenre} 
                        />
                    </div>
                    <div className='field'>
                        <label>Author:</label>
                        <select 
                            name='bookAuthor' 
                            value={bookAuthor} 
                            onChange={this.handleChange}
                        >
                            <option>Select author</option>
                            {authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>)
                            )}
                        </select>
                    </div>
                    <input type='submit' value='+' />
                </form>}
            </>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);