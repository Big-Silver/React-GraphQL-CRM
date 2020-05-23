export default (_, { token }, { cache }) => {
  const data = {
    auth: {
      __typename: 'AuthState',
      token
    }
  };
  cache.writeData({ data });
  localStorage.setItem('token', token);

  return { token };
};
