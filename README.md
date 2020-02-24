# GraphQL full course - Notice to Expert

https://www.youtube.com/watch?v=ed8SzALpx1Q

## Making a GQL query on component load

This will make the query when the file runs, as opposed to when an event (e.g. a button click) happens. The data received back from the query will be inside ```this.props```.

1. Import the packages inside the component
    ```
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
    ```
    export default graphql(getBooksQuery)(BookList);
    ```