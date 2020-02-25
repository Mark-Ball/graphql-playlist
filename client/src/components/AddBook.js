import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

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