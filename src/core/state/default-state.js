export default {
  auth: {
    __typename: 'AuthState',
    token: localStorage.getItem('token')
  }
};
