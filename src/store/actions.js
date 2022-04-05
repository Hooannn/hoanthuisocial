import firebase from "firebase/app";
import Vue from "vue";
import db from "./../plugins/firebase"
import store from "./store";
//const usersOnline=db.ref('usersOnline')
const objectToArray = (obj) =>
  Object.keys(obj)
    .sort()
    .map((key) => ({
      key: key,
      email: obj[key].email,
      role: obj[key].role,
      username: obj[key].username,
      avatarImg:obj[key].avatarImg,
      status:obj[key].status,
      dob:obj[key].dob,
      coverImg:obj[key].coverImg
    }));
const usersInf = db.ref("usersInformation");

const actions = {
  signUp({ commit }, account) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(account.email, account.password)
      .then((response) => {
        let account = response.user;
        sessionStorage.setItem("account", JSON.stringify(account));
        commit("SET_USER", response.user);
        commit("SET_ERROR", "Successfully signed up !");
        commit("SET_STATUS", null);
        usersInf.push({
          email: response.user.email,
          username: "Unset",
          dob: "Unset",
          avatarImg:
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
          role: "Member",
          status:'Offline',
          registerDate:new Date().toLocaleDateString(),
        });
      })
      .catch((error) => {
        commit("SET_USER", null);
        commit("SET_ERROR", error.message);
        commit("SET_STATUS", false);
      });
  },
  setMessage({ commit }, message) {
    commit("SET_ERROR", message);
  },
  login({ commit }, account) {
    firebase
      .auth()
      .signInWithEmailAndPassword(account.email, account.password)
      .then((response) => {
        //login logic go after this comment
        let user;
        commit("SET_USER", response.user);
        commit("SET_ERROR", "Successfully signed in !");
        commit("SET_STATUS", true);
        let account = response.user;
        sessionStorage.setItem("account", JSON.stringify(account));
        //usersOnline.push({email:response.user.email})
        usersInf
          .get()
          .then((res) => {
            user = objectToArray(res.val()).filter(
              (user) => user.email == response.user.email
            );
            commit("SET_ROLE", user[0].role);
            commit("SET_UKEY", user[0].key);
            commit("SET_AVATAR", user[0].avatarImg);
            commit("SET_USERNAME", user[0].username);
            commit("SET_DOB", user[0].dob);
            commit("SET_USERSTATUS", user[0].status);
            commit("SET_COVER", user[0].coverImg);
            db.ref("usersInformation")
              .child(user[0].key)
              .child("status")
              .set("Online");
            db.ref("usersInformation")
              .child(user[0].key)
              .child("Last Login")
              .set(new Date().getTime());
            sessionStorage.setItem("role", user[0].role);
            sessionStorage.setItem("ukey", user[0].key);
            sessionStorage.setItem("username", user[0].username);
            sessionStorage.setItem("dob", user[0].dob);
            sessionStorage.setItem("status", user[0].status);
            sessionStorage.setItem("avatar", user[0].avatarImg);
            sessionStorage.setItem("cover", user[0].coverImg);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        commit("SET_USER", null);
        commit("SET_ERROR", error.message);
        commit("SET_STATUS", false);
      });
  },
  logOut({ commit }) {
    /*
      usersOnline.get().then(res => {
        let resVal=res.val()
        let curUserOnl=Object.keys(resVal).map(key=> ({key:key,email:resVal[key].email})).filter(user => user.email == store.state.user.email)[0].key
        usersOnline.child(curUserOnl).remove().then(res => {
          console.log(res)
        
        })  
      })*/
    firebase
      .auth()
      .signOut()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    db.ref("usersInformation")
      .child(store.state.ukey)
      .child("status")
      .set("Offline");
    commit("SET_USER", null);
    commit("SET_ERROR", null);
    commit("SET_STATUS", null);
    sessionStorage.clear();
  },
  getBlogData({ commit }, blogsDB) {
    commit("SET_BLOGDATA", blogsDB);
  },
  warning(context, message) {
    Vue.$toast.warning(message, {
      position: "top-right",
      timeout: 2000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
  },
  success(context, message) {
    Vue.$toast.success(message, {
      position: "top-right",
      timeout: 2000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
  },
  error(context, message) {
    Vue.$toast.error(message, {
      position: "top-right",
      timeout: 2000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
  },
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  setRole({ commit }, role) {
    commit("SET_ROLE", role);
  },
  setUkey({ commit }, ukey) {
    commit("SET_UKEY", ukey);
  },
  setUsername({ commit }, username) {
    commit("SET_USERNAME", username);
  },
  setMode({ commit }, mode) {
    commit("SET_MODE", mode);
  },
  setAvatar({ commit }, avatar) {
    commit("SET_AVATAR", avatar);
  },
  setDob({ commit }, dob) {
    commit("SET_DOB", dob);
  },
  setStatus({ commit }, status) {
    commit("SET_USERSTATUS", status);
  },
  setCover({commit},cover) {
    commit("SET_COVER",cover)
  },
  closeMoreInfo({commit,state},e) {
    let dropDown=document.querySelector('#app > div > div.dbnav > div > div.dbnav__short-info > div.drop-down')   
    let btn=document.querySelector('#app > div > div.dbnav > div > div.dbnav__short-info > div.more-setting')
    let avatar=document.querySelector('#app > div > div.dbnav > div > div.dbnav__short-info > div.more-setting> div.user-avatar')
    let shortInfo=document.querySelector('#app > div > div.dbnav > div > div.dbnav__short-info >div.more-setting')
    if (e.target.parentElement != btn && e.target!=btn && e.target.parentElement!=avatar ) {
      dropDown.classList.remove('show')
      shortInfo.classList.remove('show')
    }
  }
};
export default actions;
