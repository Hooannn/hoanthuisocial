import router from "@/router/router";
import firebase from "firebase/app";
import Vue from "vue";
import db from "./../plugins/firebase";
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
      avatarImg: obj[key].avatarImg,
      status: obj[key].status,
      dob: obj[key].dob,
      coverImg: obj[key].coverImg,
      location: obj[key].location,
      type:obj[key].type,
      credit:obj[key].credit,
    }));
const usersInf = db.ref("usersInformation");

const actions = {
  signUp({ commit }, newAccount) {
    let loader=document.querySelector('#app > div.loading-page')
    loader.classList.add('show')
    firebase
      .auth()
      .createUserWithEmailAndPassword(newAccount.email, newAccount.password)
      .then((response) => {
        loader.classList.remove('show')
        let account = response.user;
        sessionStorage.setItem("account", JSON.stringify(account));
        commit("SET_USER", response.user);
        commit("SET_ERROR", "Successfully signed up !");
        commit("SET_STATUS", null);
        usersInf.push({
          type:'user',
          email: response.user.email,
          username: newAccount.username,
          dob: newAccount.dob,
          avatarImg:
            "https://www.placidsoftware.com/assets/images/user-img.png",
          role: "Member",
          status: "Offline",
          phone: newAccount.phone,
          /*
          education: {
            title:'Title',
            from:"From",
            to:"to",
            website:"www.website.com"
          },
          employment: {
            title:'Title',
            from:"From",
            to:"to",
            website:"www.website.com"
          },
          */
          description: "Description",
          coverImg: "https://wallpaperaccess.com/full/99810.jpg",
          socialAccounts: {
            facebook: "https://www.facebook.com/",
            github: "https://www.github.com/",
            instagram: "https://www.instagram.com/",
            pinterest: "https://www.pinterest.com/",
            twitter: "https://www.twitter.com/",
            youtube: "https://www.youtube.com/channel/",
          },
          location: newAccount.location,
          gender: newAccount.gender,
          statusrel: newAccount.statusrel,
          password: newAccount.password,
          credit:0,
          registerDate: new Date().toLocaleDateString(),
        })
        store.dispatch('login',newAccount)
      })
      .catch((error) => {
        loader.classList.remove('show')
        commit("SET_USER", null);
        commit("SET_ERROR", error.message);
        commit("SET_STATUS", false);
      });
  },
  setMessage({ commit }, message) {
    commit("SET_ERROR", message);
  },
  login({ commit }, account) {
    let loader=document.querySelector('#app > div.loading-page')
    loader.classList.add('show')
    firebase
      .auth()
      .signInWithEmailAndPassword(account.email, account.password)
      .then((response) => {
        let log = {
          user:response.user.email,
          type:"login",
          time:new Date().getTime(),
          date:new Date().toLocaleString()
        }
        db.ref('logs').push(log)
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
            commit("SET_LOCATION", user[0].location);
            store.state.type=user[0].type
            store.state.credit=user[0].credit
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
            sessionStorage.setItem("location", user[0].location);
            sessionStorage.setItem("type", user[0].type);
            sessionStorage.setItem("credit", user[0].credit);
            loader.classList.remove('show')
            router.push({name:'dhome'})
          })
          .catch((err) => {
            loader.classList.remove('show')
            console.log(err)
          });
      })
      .catch((error) => {
        commit("SET_USER", null);
        commit("SET_ERROR", error.message);
        commit("SET_STATUS", false);
        loader.classList.remove('show')
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
    store.dispatch('loading')
    let log = {
      user:store.state.user.email,
      type:"logout",
      time:new Date().getTime(),
      date:new Date().toLocaleString()
    }
    db.ref('logs').push(log)
    firebase
      .auth()
      .signOut()
      .then(()=>{
        sessionStorage.clear();
        store.replaceState({})
        store.dispatch('unload')
        location.reload()
      })
      .catch((err) => console.log(err));
    db.ref("usersInformation")
      .child(store.state.ukey)
      .child("status")
      .set("Offline");
      /*
    commit("SET_USER", null);
    commit("SET_ERROR", null);
    commit("SET_STATUS", null);
    */
  },
  //send invite friend request
  sentFriendRequest(context, contactKey) {
    let userKey = context.state.ukey;
    db.ref("usersInformation")
      .child(contactKey)
      .child("friends")
      .child("friendrequested")
      .push(userKey)
      .catch((err) => console.log(err));
    db.ref("usersInformation")
      .child(userKey)
      .child("friends")
      .child("friendrequesting")
      .push(contactKey)
      .catch((err) => console.log(err));
    let noti = {
      content: `${context.state.username} has sent you a friend requested.`,
      date: new Date().toLocaleString(),
      time: -(new Date().getTime()),
      status: "Unseen",
      type: "send-friendInvite",
      ukey: userKey,
    };
    db.ref("usersInformation")
      .child(contactKey)
      .child("notifications")
      .push(noti);
  },
  ///

  ///group manage handle
  acceptGroupRequest(context,payload) {
    //check if is member if required //
    store.dispatch('loading')
    let newMember= {
      key:payload.targetKey,
      role:'member'
    }
    
    let newGroup={
      groupKey:payload.groupKey,
      role:'member'
    }
    
    db.ref('groups').child(payload.groupKey).child('members').push(newMember).then(()=>
    {
      db.ref('usersInformation').child(payload.targetKey).child('groups').push(newGroup)
      db.ref('groups').child(payload.groupKey).child('membersRequest').get().then(res => {
        let rqKey
        let resVal = res.val();
        if (resVal) {
          resVal = Object.keys(resVal).map((key) => ({
            key: key,
            ukey: resVal[key]
          }));
        rqKey = resVal.find((ele) => ele.ukey == payload.targetKey).key;
        }
        if (rqKey!=undefined && rqKey!=null) {
          db.ref('groups').child(payload.groupKey).child('membersRequest').child(rqKey).remove()
        }
        //user noti
        let noti= {
          content: `Your request has been accepted. Welcome to our group.`,
          date: new Date().toLocaleString(),
          groupKey:payload.groupKey,
          time: -(new Date().getTime()),
          status: "Unseen",
          type: "accept-group-request",
          ukey: payload.groupKey,
        }
        db.ref('usersInformation').child(payload.targetKey).child('notifications').push(noti)
        //group noti
        let gnoti= {
          content: `New member joined.`,
          date: new Date().toLocaleString(),
          groupKey:payload.groupKey,
          time: -(new Date().getTime()),
          status: "Unseen",
          type: "group-user-accept",
          ukey: payload.targetKey,
        }
        db.ref('groups').child(payload.groupKey).child('notifications').push(gnoti)
        //
        store.dispatch('unload')
      }).catch(err=>{
        alert(err)
        store.dispatch('unload')
      })
    }).catch(err => {
      alert(err)
      store.dispatch('unload')
    })
  },
  leaveGroup(context, contactKey) {
    store.dispatch('loading')
    let userKey = context.state.ukey;
    db.ref('groups').child(contactKey).child('members').get()
    .then((res) => {
      db.ref('usersInformation').child(userKey).child('groups').get().then((res)=>{
        let resVal=res.val()
        let gKey
        if (resVal) {
          resVal=Object.keys(resVal).map((key)=>({key:key,groupKey:resVal[key].groupKey}))
          gKey=resVal.find(e=>e.groupKey==contactKey).key
        }
        if (gKey != null&& gKey !=undefined) {
          db.ref('usersInformation').child(userKey).child('groups').child(gKey).remove().catch(err=>alert(err))
        }
      })
      //
      let rqKey
      let resVal = res.val();
      if (resVal) {
        resVal = Object.keys(resVal).map((key) => ({
          key: key,
          ukey: resVal[key].key,
          role:resVal[key].role,
        }));
        rqKey = resVal.find((ele) => ele.ukey == userKey).key;
      }
      if (rqKey!=undefined && rqKey!=null) {
        db.ref('groups').child(contactKey).child('members').child(rqKey).remove()
      }
      let noti= {
        content: `${store.state.username} has left group.`,
        date: new Date().toLocaleString(),
        groupKey:contactKey,
        time: -(new Date().getTime()),
        status: "Unseen",
        type: "group-user-leave",
        ukey: userKey,
      }
      db.ref('groups').child(contactKey).child('notifications').push(noti)
      store.dispatch('unload')
    }).catch((err)=>{
      alert(err)
      store.dispatch('unload')
    })
  },
  refuseGroupRequest(context, payload) {
    store.dispatch('loading')
    db.ref('groups').child(payload.groupKey).child('membersRequest').get().then(res => {
      let rqKey
      let resVal = res.val();
      if (resVal) {
        resVal = Object.keys(resVal).map((key) => ({
          key: key,
          ukey: resVal[key]
        }));
      rqKey = resVal.find((ele) => ele.ukey == payload.targetKey).key;
      }
      if (rqKey!=undefined && rqKey!=null) {
        db.ref('groups').child(payload.groupKey).child('membersRequest').child(rqKey).remove().then(()=>{
          let noti= {
            content: `Sorry. Your request has been refused.`,
            date: new Date().toLocaleString(),
            groupKey:payload.groupKey,
            time: -(new Date().getTime()),
            status: "Unseen",
            type: "refuse-group-request",
            ukey: payload.groupKey,
          }
          db.ref('usersInformation').child(payload.targetKey).child('notifications').push(noti)
          store.dispatch('unload')
        }).catch(err=>{
          alert(err)
          store.dispatch('unload')
        })
      }
    })
  },
  sentGroupRequest(context, contactKey) {
    store.dispatch('loading')
    let userKey = context.state.ukey;
    db.ref('groups').child(contactKey).child('membersRequest').push(userKey).then(()=>{
      store.dispatch('unload')
    }).catch(err=>{
      alert(err)
      store.dispatch('unload')
    })
    let noti= {
      content: `You has sent a request to join this group. Please wait for their decision.`,
      date: new Date().toLocaleString(),
      groupKey:contactKey,
      time: -(new Date().getTime()),
      status: "Unseen",
      type: "send-group-request",
      ukey: contactKey,
    }
    db.ref('usersInformation').child(userKey).child('notifications').push(noti)
    let gnoti= {
      content: `${store.state.username} has sent request to join group.`,
      date: new Date().toLocaleString(),
      groupKey:contactKey,
      time: -(new Date().getTime()),
      status: "Unseen",
      type: "group-user-request",
      ukey: userKey,
    }
    db.ref('groups').child(contactKey).child('notifications').push(gnoti)
    //
  },
  cancleGroupRequest(context, contactKey) {
    store.dispatch('loading')
    let userKey = context.state.ukey;
    db.ref('groups').child(contactKey).child('membersRequest').get()
    .then((res) => {
      let rqKey
      let resVal = res.val();
      if (resVal) {
        resVal = Object.keys(resVal).map((key) => ({
          key: key,
          ukey: resVal[key]
        }));
        rqKey = resVal.find((ele) => ele.ukey == userKey).key;
      }
      if (rqKey!=undefined && rqKey!=null) {
        db.ref('groups').child(contactKey).child('membersRequest').child(rqKey).remove().then(()=>{
          store.dispatch('unload')
        }).catch(err=>{
          alert(err)
          store.dispatch('unload')
        })
      }
    })
  },
  banUser(context,payload) {
    store.dispatch('loading')
    db.ref('groups').child(payload.groupKey).child('members').get().then(res=> {
      db.ref('usersInformation').child(payload.targetKey).child('groups').get().then(res=>{
        let resVal=res.val()
        let gKey
        if (resVal) {
          resVal=Object.keys(resVal).map((key)=>({key:key,groupKey:resVal[key].groupKey}))
          gKey=resVal.find(e=>e.groupKey==payload.groupKey).key
        }
        if (gKey!=null && gKey!=undefined) {
          db.ref('usersInformation').child(payload.targetKey).child('groups').child(gKey).remove().catch(err=>alert(err))
        }
      })
      /////
      let resVal=res.val()
      resVal=Object.keys(resVal).map((key)=>({key:key,ukey:resVal[key].key}))
      let memberKey=resVal.find(user=>user.ukey==payload.targetKey).key
      db.ref('groups').child(payload.groupKey).child('members').child(memberKey).remove().then(()=>{
        let noti= {
          content: `You have been kicked by the staffs.`,
          date: new Date().toLocaleString(),
          groupKey:payload.groupKey,
          time: -(new Date().getTime()),
          status: "Unseen",
          type: "accept-group-request",
          ukey: payload.groupKey,
        }
        db.ref('usersInformation').child(payload.targetKey).child('notifications').push(noti)
        store.dispatch('unload')
      }).catch(()=>store.dispatch('unload'))
    }).catch(err=>alert(err))
  },
  /////
  //follow handle
  follow(context, contactKey) {
    store.dispatch('loading')
    let userKey = context.state.ukey;
    db.ref("usersInformation")
      .child(userKey)
      .child("follows")
      .child("following")
      .get()
      .then((res) => {
        let resVal = res.val();
        let flingKey;
        if (resVal) {
          resVal = Object.keys(resVal).map((key) => ({
            key: key,
            value: resVal[key],
          }));
          flingKey = resVal.filter((ele) => ele.value == contactKey);
        }
        if (flingKey==undefined||flingKey.length==0) {
          db.ref("usersInformation")
            .child(contactKey)
            .child("follows")
            .child("followed")
            .push(userKey);
          db.ref("usersInformation")
            .child(userKey)
            .child("follows")
            .child("following")
            .push(contactKey);
          let noti = {
            content: `${context.state.username} has followed you.`,
            date: new Date().toLocaleString(),
            time: -(new Date().getTime()),
            status: "Unseen",
            type: "follow",
            ukey: userKey,
          };
          db.ref("usersInformation")
            .child(contactKey)
            .child("notifications")
            .push(noti);
        } else {
          store.dispatch('unload')
          return;
        }
        store.dispatch('unload')
      })
      .catch((err) => {
        store.dispatch('unload')
        alert(err)
      });
  },
  unfollow(context, contactKey) {
    store.dispatch('loading')
    let userKey = context.state.ukey;
    db.ref("usersInformation")
      .child(contactKey)
      .child("follows")
      .child("followed")
      .get()
      .then((res) => {
        let resVal = res.val();
        resVal = Object.keys(resVal).map((key) => ({
          key: key,
          value: resVal[key],
        }));
        let fledKey = resVal.find((ele) => ele.value == userKey).key;
        if (fledKey) {
          db.ref("usersInformation")
            .child(contactKey)
            .child("follows")
            .child("followed")
            .child(fledKey)
            .remove()
            .catch((err) => console.log(err));
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
    db.ref("usersInformation")
      .child(userKey)
      .child("follows")
      .child("following")
      .get()
      .then((res) => {
        let resVal = res.val();
        resVal = Object.keys(resVal).map((key) => ({
          key: key,
          value: resVal[key],
        }));
        let flingKey = resVal.find((ele) => ele.value == contactKey).key;
        if (flingKey) {
          db.ref("usersInformation")
            .child(userKey)
            .child("follows")
            .child("following")
            .child(flingKey)
            .remove()
            .catch((err) => console.log(err));
        } else {
          return;
        }
      }).then(()=>{
        store.dispatch('unload')
      })
      .catch((err) => {
        store.dispatch('unload')
        alert(err)
      });
  },
  ///
  //loading animation
  loading() {
    let loader=document.querySelector('#app > div.loading-page')
    loader.classList.add('show')
  },
  unload() {
    let loader=document.querySelector('#app > div.loading-page')
    loader.classList.remove('show')
  },
  //
  /*
  getMutualFriend({ state }, targetKey) {
    let myKey = state.ukey;
    //const myFriendList=[];
    //const targetFriendList=[];
    //const mutualFriendList=[];
    db.ref("usersInformation")
      .child(myKey)
      .child("friends")
      .child("isfriend")
      .get()
      .then((res) => {
        let resVal = res.val();
        resVal = Object.keys(resVal).map((key) => ({
          key: key,
          value: resVal[key],
        }));
        resVal.forEach(fr => {
          myFriendList.push(fr)
        });
      });
      db.ref("usersInformation")
          .child(targetKey)
          .child("friends")
          .child("isfriend")
          .get()
          .then((res) => {
          let resVal = res.val();
            resVal = Object.keys(resVal).map((key) => ({
              key: key,
              value: resVal[key],
            }));
            resVal.forEach(fr => {
              targetFriendList.push(fr)
            });
        });
    //
    console.log(mutualFriendList)
    console.log('-------------------------')
    //return mutualFriendList.length;
  },
  */
  ///set state
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  setRole({ commit }, role) {
    commit("SET_ROLE", role);
  },
  setType({ commit }, type) {
    commit("SET_TYPE", type);
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
  setCover({ commit }, cover) {
    commit("SET_COVER", cover);
  },
  setLocation({ commit }, location) {
    commit("SET_LOCATION", location);
  },
  setUnseenNoti({commit},pay) {
    commit("SET_UNSEENNOTI", pay)
  },
  addMsgData({commit}, message) {
    commit("ADD_MESSAGEDATA", message)
  },
  removeMsgData({commit}, message) {
    commit("REMOVE_MESSAGEDATA", message)
  },
  ///
  /////close all dropdown
  closeMoreInfo({ commit, state }, e) {
    let dropDown = document.querySelector(
      "#app > div > div.dbnav > div > div.dbnav__short-info > div.drop-down"
    );
    let btn = document.querySelector(
      "#app > div > div.dbnav > div > div.dbnav__short-info > div.more-setting"
    );
    let avatar = document.querySelector(
      "#app > div > div.dbnav > div > div.dbnav__short-info > div.more-setting> div.user-avatar"
    );
    let shortInfo = document.querySelector(
      "#app > div > div.dbnav > div > div.dbnav__short-info >div.more-setting"
    );
    if (
      e.target.parentElement != btn &&
      e.target != btn &&
      e.target.parentElement != avatar
    ) {
      dropDown.classList.remove("show");
      shortInfo.classList.remove("show");
    }
    //
    let notiDropdown = document.querySelector(
      "#app > div > div.dbnav > div > div.dbnav__notifications > div"
    );
    let notiSpan = document.querySelector(
      "#app > div > div.dbnav > div > div.dbnav__notifications > span > div"
    );
    if (e.target != notiSpan) {
      notiDropdown.classList.remove("show");
      notiSpan.classList.remove("show");
    }
    //
    let mbControl=document.querySelector('#app > div.dash-board > div.message-bar-control.center')
    let mbCIcon=document.querySelector('#app > div.dash-board > div.message-bar-control.center .icon')
    let mb=document.querySelector('#app > div.dash-board > div.message-bar')
    let usermessage=document.querySelectorAll('#app > div.dash-board > div.message-bar.show > div.message-user')
    usermessage.forEach(usermsg => {
      if (e.target.parentElement != usermsg && e.target!=mbCIcon && e.target!=mbControl && e.target!=mb) {
        mb.classList.remove('show')
        mbControl.classList.remove('move')
      }
    });
    //
    let controlPost = document.querySelectorAll(
      "div.post-com > div.post-header > div.control"
    );
    let controlComment = document.querySelectorAll(
      "div.post-com > div.post-comments.show > div.post-comment > div.comment-header > div.control"
    );
    //
    //
    //let controlPost=document.querySelectorAll('#app > div > div.profile-view > div.profile__content > div.container > div.post-view > div.second-col > div.posts-list > div.post-com > div.post-header > div.control')
    //let controlComment=document.querySelectorAll('#app > div > div.profile-view > div.profile__content > div.container > div.post-view > div.second-col > div.posts-list > div.post-com > div.post-comments.show > div.post-comment > div.comment-header > div.control')
    controlPost.forEach((control) => {
      if (e.target.parentElement != control && e.target != control) {
        control.children[1].classList.remove("show");
      }
    });
    controlComment.forEach((control) => {
      if (e.target.parentElement != control && e.target != control) {
        control.children[1].classList.remove("show");
      }
    });
    let option = document.querySelectorAll("div.friend-com div.option");
    option.forEach((control) => {
      if (e.target.parentElement.parentElement != control) {
        control.children[1].classList.remove("show");
      }
    });
    //
    let aboutUserControl=document.querySelectorAll("div.about-user div.control")
    //let aboutUserControlText=document.querySelector("div.about-user .group-member-control")
    aboutUserControl.forEach(element => {
      if (e.target != element.parentElement.children[2]) {
        element.classList.remove("show");
      }
      });
    //
  },
};
export default actions;
