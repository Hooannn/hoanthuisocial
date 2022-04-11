<template>
  <div class="dbnav">
      <div class="dbnav__content container">
          <div class="dbnav__logo">
          <img :src="logo">
            </div>
          <div class="dbnav__home">
              <span @click='$router.push({name:"dhome"}),selected="Home"' :class='{selected:selected=="Home"}'>Home</span>
          </div>
          <div class="dbnav__messages">
              <span @click='$router.push({name:"messages"}),selected="Messages"' :class='{selected:selected=="Messages"}'>Messages</span>
          </div>
          <div class="dbnav__notifications">
              <span @click='selected="Notifications"' :class='{selected:selected=="Notifications"}'>Notifications</span>
          </div>
          <button style='borderColor:#ff7555;background-color:#ff7555;color:rgba(233,224,224);fontWeight:bolder' class='dbnav__market btn btn-danger btn-sm'>Market</button>
        <div class="dbnav__short-info">
          <div @click='showMoreInfo' class="more-setting">
              <div class="user-avatar">
                  <img :src="$store.state.avatarImg">
              </div>
              <span>Hi ! {{$store.state.username}}</span>
              <ion-icon
                style="marginLeft: 5px"
                name="chevron-down-outline"
              ></ion-icon>
          </div>
          <div class="drop-down">
            <div @click='viewMyProfile'><span>Profile</span></div>
            <div><span>Credit</span></div>
            <div><span>Friends</span></div>
            <div><span>Invite</span></div>
            <div><span>Setting</span></div>
            <div @click='logOut'><span>Logout</span></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import logo from './../../assets/images/logo.png'
import store from './../../store/store'
import router from './../../router/router'
export default {
    data() {
        return {
            logo:logo,
            selected:'Home',
        }
    },
    methods: {
        showMoreInfo() {
            let dropDown=document.querySelector('#app > div > div.dbnav > div > div.dbnav__short-info > div.drop-down')
            let shortInfo=document.querySelector('#app > div > div.dbnav > div > div.dbnav__short-info >div.more-setting')
            dropDown.classList.toggle('show')
            shortInfo.classList.toggle('show')
        },
        logOut() {
        setTimeout(function () {
        store.dispatch("logOut");
        }, 500);
        setTimeout(function () {
        router.push("/home");
        }, 1000);
        },
        viewMyProfile() {
            router.push('/loading')
            setTimeout(function(){
                router.push({name:"post",params:{key:store.state.ukey}})
            }, 50)
        }
    }
};
</script>

<style>
.dbnav {
    position: fixed;
    z-index:10;
    width: 100vw;
    height: 50px;
    background-color:#313131;
}
.dbnav__logo {
    height: 50px;
    margin-top:20px;
}
.dbnav__logo img{
    height: 100%;
    width: 100%;
    transform: scale(2.5);
}
.dbnav__content {
    color:rgba(233, 224, 224, 0.74);
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    font-size: 14px;
}
.dbnav .dbnav__content .dbnav__home span:hover, .dbnav .dbnav__content .dbnav__messages span:hover,.dbnav .dbnav__content .dbnav__notifications span:hover {
    color:white;
    text-shadow: 2px 2px 3px rgba(255,255,255,0.3);
    cursor: pointer;
}
.dbnav .dbnav__content .dbnav__home span.selected, .dbnav .dbnav__content .dbnav__messages span.selected,.dbnav .dbnav__content .dbnav__notifications span.selected {
    color:white;
    text-shadow: 2px 2px 3px rgba(255,255,255,0.3);
}
/* */
.dbnav .dbnav__short-info {
    color:rgba(233, 224, 224, 0.74);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.dbnav .dbnav__short-info .more-setting {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    font-size: 14px;
    transition:.2s;
}
.dbnav .dbnav__short-info .more-setting.show {
    color:white;
}
.dbnav .dbnav__short-info .more-setting:hover {
    color:white;
    cursor: pointer;
}
.dbnav .dbnav__short-info .more-setting .user-avatar{
    width: 25px;
    height: 25px;
    overflow: hidden;
    border-radius: 50%;
    border:1px solid gray;
    margin-right:5px;
}
.user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.dbnav .dbnav__short-info .drop-down {
    display: flex;
    flex-direction: column;
    visibility: hidden;
    width: 150px;
    position: absolute;
    top:90%;
    background-color:whitesmoke;
    color:rgb(43, 42, 42);
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    border-radius: 2px;
}
.dbnav .dbnav__short-info .drop-down.show {
    visibility: visible;
}
.drop-down::before {
    content:'';
    position: absolute;
    bottom:99%;
    right:10%;
    width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 10px solid whitesmoke;
}
.drop-down div {
    padding:8px 10px;
    cursor: pointer;
}
.drop-down div:hover {
    border-left:2px solid orangered;
    color:orangered;
    background-color:rgba(233, 227, 227, 0.1);
}
.drop-down div:hover span{
    transform: translateX(3px);
}
</style>
