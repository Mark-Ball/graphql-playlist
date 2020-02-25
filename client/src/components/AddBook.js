import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
    state = {
        bookName: '',
        bookGenre: '',
        bookAuthor: ''
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        // nested destructuring, equivalent to:
        // const { data } = this.props;
        // const { authors, loading } = data;
        const { data: { authors }, data: { loading } } = this.props;
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
                <form id='add-book'>
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
                            </option>))}
                        </select>
                    </div>
                    <input type='submit' value='+' />
                </form>}
            </>
        )
    }
}

export default graphql(getAuthorsQuery)(AddBook);