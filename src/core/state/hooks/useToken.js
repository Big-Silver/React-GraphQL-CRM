import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_TOKEN = gql`
  {
    auth @client {
      token
    }
  }
`;

export default () => {
  const {
    data: {
      auth: { token }
    }
  } = useQuery(GET_TOKEN);

  return token;
};
