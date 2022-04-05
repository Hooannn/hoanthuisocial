const getters = {
  getStatus: (state) => state.success,
  getMessage: (state) => state.error,
  getRole: (state) => state.role,
  getUKey: (state) => state.ukey,
  getUsername: (state) => state.username
};
export default getters;
