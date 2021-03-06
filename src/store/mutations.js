const mutations = {
  SET_USER(state, res) {
    state.user = res;
  },
  SET_ERROR(state, res) {
    state.error = res;
  },
  SET_STATUS(state, success) {
    state.success = success;
  },
  SET_BLOGDATA(state, blogsDB) {
    state.blogData = blogsDB;
  },
  SET_ROLE(state, role) {
    state.role = role;
  },
  SET_UKEY(state, ukey) {
    state.ukey=ukey
  },
  SET_USERNAME(state, username) {
    state.username=username
  },
  SET_MODE(state, mode) {
    state.mode=mode
  },
  SET_AVATAR(state, avatar) {
    state.avatarImg=avatar
  },
  SET_DOB(state,dob) {
    state.dob=dob
  },
  SET_USERSTATUS(state,status) {
    state.userstatus=status
  },
  SET_COVER(state,cover) {
    state.coverImg=cover
  },
  SET_LOCATION(state,location) {
    state.location=location
  },
  SET_UNSEENNOTI(state, payload) {
    state.unseenNoti=payload
  },
  SET_TYPE(state, payload) {
    state.type=payload
  },
  ADD_MESSAGEDATA(state, message) {
    if (state.messagesData.indexOf(message)==-1) {
      state.messagesData.push(message)
    }
  },
  REMOVE_MESSAGEDATA(state, message) {
    state.messagesData.splice(state.messagesData.indexOf(message),1)
  }
};
export default mutations;
