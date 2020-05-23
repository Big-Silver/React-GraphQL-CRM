import ApolloClient from 'apollo-boost';

import clientState from './state';

export default new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  headers: {
    authorization: localStorage.getItem('token')
  },
  clientState,
  connectToDevTools: true
});
