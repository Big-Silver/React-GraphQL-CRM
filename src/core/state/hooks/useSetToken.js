import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const UPDATE_TOKEN_QUERY = gql`
  mutation updateToken($token: String) {
    updateToken(token: $token) @client
  }
`;

export default () => {
  const [setToken] = useMutation(UPDATE_TOKEN_QUERY);
  return setToken;
};
