<template>
    <div class="dbnav">
        <!-- window screen -->
      <div class="dbnav__content container">
          <div class="dbnav__logo">
          <img :src="logo">
            </div>
          <div class="dbnav__home">
              <span @click='$router.push({name:"dhome"}),selected="Home"' :class='{selected:selected=="Home"}'><span>Home</span></span>
          </div>
          <div class="dbnav__messages">
              <span style='position:relative' @click='showMessageBar' :class='{selected:selected=="Messages"}'><div>Messages</div>
                  <span v-if='!unseenMsg==0' style='pointerEvents:none;position:absolute;top:-5px;right:-10px;backgroundColor:red;borderRadius:3px;display:flex;justifyContent:center;alignItems:center;width:15px;height:15px;fontSize:8px;color:white'>
                    {{ unseenMsg }}
                </span>
              </span>
          </div>
          <div class="dbnav__notifications">
              <span style='position:relative' @click='showNoti' :class='{selected:selected=="Notifications"}'>
                  <div>Notifications</div>
                <span v-if='!unseenNoti==0' style='pointerEvents:none;position:absolute;top:-5px;right:-10px;backgroundColor:red;borderRadius:3px;display:flex;justifyContent:center;alignItems:center;width:15px;height:15px;fontSize:8px;color:white'>
                    {{ unseenNoti }}
                </span>
              </span>
              <div class="drop-down">
                  <div class='vl' style='pointerEvents:none;top:0;position:absolute;left:13.5%;borderLeft:2px solid rgb(255, 117, 85,0.5);height:100%'></div>
                  <div @click='clearNoti' style='zIndex:1;backgroundColor:whitesmoke;width:100%;display:flex;justifyContent:center;'><button style='color:grey' class='btn btn-sm btn-link'>Clear</button></div>
                  <div style='zIndex:1;padding:5px 10px;background-color:white;borderBottom:1px solid grey' v-if='notis.length==0'>You have no notifications.</div>
                  <noti-com :class='noti[".key"]' v-for='noti in notis' :key='noti[".key"]' :notiKey="noti['.key']"/>
              </div>
          </div>
          <button style='borderColor:#ff7555;background-color:#ff7555;color:rgba(233,224,224);fontWeight:bolder' class='dbnav__market btn btn-danger btn-sm btn-wd'>Market</button>
          <button style='borderColor:#ff7555;background-color:#ff7555;color:rgba(233,224,224);fontWeight:bolder' class='dbnav__market btn btn-danger btn-sm btn-mb'><ion-icon name="cart"></ion-icon></button>
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
          <div style='width:150px' class="drop-down">
            <div @click='viewMyProfile'><span>Profile</span></div>
            <div><span>Credit</span></div>
            <div v-if='$store.state.type!="page"' @click='viewMyFriend'><span>Friends</span></div>
            <div v-if='$store.state.type!="page"'><span>Invite</span></div>
            <div><span>Setting</span></div>
            <div @click='logOut'><span>Logout</span></div>
            <div @click='$router.push({name:"console"})' v-if='$store.state.role=="Admin"'>Console</div>
          </div>
        </div>
      </div>
        <!-- window screen -->
        <!-- mobile screen -->

  </div>
</template>

<script>
import newmessage from '../../assets/sounds/newmessage.mp3'
import newnoti from '../../assets/sounds/newnoti.mp3'
import unseennoti from '../../assets/sounds/unseennoti.mp3'
import db from '../../plugins/firebase'
import logo from './../../assets/images/logo.png'
import store from './../../store/store'
import router from './../../router/router'
import NotiCom from '../../components/General/NotiCom.vue'
const newnotiSound=new Audio(newnoti)
const unseennotiSound=new Audio(unseennoti)
const newmessageSound=new Audio(newmessage)
export default {
    components: {
        NotiCom
    },
    data() {
        return {
            logo:logo,
            selected:'Home',
            notis:[],
            currentNoti:0,
            interval:null,
            //
            messages:[],
            unseenMsg:0,
        }
    },
    computed: {
        unseenNoti() {
            return this.notis.filter(noti => noti.status=="Unseen").length
        },
    },
    watch: {
        notis() {
            let unseenNoti=[]
            unseenNoti=this.notis.filter(noti => noti.status=='Unseen').length
            if (unseenNoti>this.currentNoti) {
                this.$bvToast.show('new-notifications')
                newnotiSound.play()
            }
            this.$store.dispatch('setUnseenNoti',unseenNoti)
            this.currentNoti=unseenNoti
        },
        messages() {
            this.unseenMsg=0
            this.messages.forEach(message => {
                if (message.user1==this.$store.state.ukey || message.user2==this.$store.state.ukey) {
                    if (message.data != undefined && message.data !=null) {
                    let messageData=message.data
                    messageData=Object.keys(messageData).map((key)=> ({key:key,author:messageData[key].author,status:messageData[key].status}))
                    messageData.forEach(data => {
                    if (data.author!=this.$store.state.ukey && data.status=="Unseen") {
                        this.unseenMsg++
                        this.$bvToast.show('new-message')
                        newmessageSound.play()
                    }
                });
                }
                }
            });
        }
    },
    methods: {
        showMessageBar() {
            this.selected=""
            let messageSpan=document.querySelector('#app > div.dash-board > div.dbnav > div > div.dbnav__messages > span > div')
            let mb=document.querySelector('#app > div.dash-board > div.message-bar')
            mb.classList.toggle('show')
            messageSpan.classList.toggle('show')
            //mb.style.width='35px'
            //mb.style.opacity='1'
            //mb.style.visibility='visible'
        },
        clearNoti() {
            db.ref('usersInformation').child(this.$store.state.ukey).child("notifications").remove()
        },
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
            router.push({name:'/'})
            setTimeout(function(){
               router.push({name:"post",params:{key:store.state.ukey}})
            }, 50)
        },
        viewMyFriend() {
            router.push({name:'dhome'})
            setTimeout(function(){
                router.push({name:"friends",params:{key:store.state.ukey}})
            }, 50)
        },
        showNoti() {
            this.selected=''
            let notiSpan=document.querySelector('#app > div > div.dbnav > div > div.dbnav__notifications > span > div')
            let dropDown=document.querySelector('#app > div > div.dbnav > div > div.dbnav__notifications > div.drop-down')
            dropDown.classList.toggle('show')
            notiSpan.classList.toggle('show')
        }
    },
    mounted() {
        this.$rtdbBind('notis',db.ref('usersInformation').child(this.$store.state.ukey).child('notifications').orderByChild('time'))    
        this.$rtdbBind('messages',db.ref('messagesData'))
        this.interval=setInterval(() => {
            if (store.state.unseenNoti>0) {
                this.$bvToast.show('unseen-notifications')
                unseennotiSound.play()
            }
        }, 300000);
    },
    destroyed() {
        clearInterval(this.interval)
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
.dbnav__content .btn-mb {
    display: none;
}
.dbnav__content .dbnav-icon{
    justify-content: center;
    align-items: center;
    font-size:18px;
}
.dbnav .dbnav__content .dbnav__home span:hover, .dbnav .dbnav__content .dbnav__messages span>div:hover,.dbnav .dbnav__content .dbnav__notifications span>div:hover {
    color:white;
    text-shadow: 2px 2px 3px rgba(255,255,255,0.3);
    cursor: pointer;
}
.dbnav .dbnav__content .dbnav__home span.selected{
    color:white;
    text-shadow: 2px 2px 3px rgba(255,255,255,0.3);
}
#app > div.dash-board > div.dbnav > div > div.dbnav__messages > span >div.show {
    color:white;
    text-shadow: 2px 2px 3px rgba(255,255,255,0.3);
}
#app > div.dash-board > div.dbnav > div > div.dbnav__notifications > span > div.show {
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
    max-width: 150px;
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
.dbnav .dbnav__short-info .drop-down div {
    padding:8px 10px;
    cursor: pointer;
}
.dbnav .dbnav__short-info .drop-down div:hover {
    border-left:2px solid orangered;
    color:orangered;
    background-color:rgba(233, 227, 227, 0.1);
}
.dbnav .dbnav__short-info .drop-down div:hover span{
    transform: translateX(3px);
}
/* notification drop down */
.dbnav__notifications span.show {
    color:white;
    text-shadow: 2px 2px 3px rgba(255,255,255,0.3);
}
.dbnav__notifications .drop-down {
    display: flex;
    flex-direction: column;
    visibility: hidden;
    position: absolute;
    top:90%;
    background-color: rgb(243, 234, 224);
    color:rgb(43, 42, 42);
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    border-radius: 2px;
    max-width:300px;
    overflow-y:auto;
    max-height: 600px;
}
.dbnav__notifications .drop-down::before {
    display: none;
    content: unset;
}
.dbnav__notifications .drop-down.show {
    visibility: visible;
}
/* -------- */
@media only screen and (max-width: 768px) {
    .dbnav {
        height: 35px;
    }
    .dbnav__logo {
        display: none;
    }
    .dbnav__content {
        font-size: 13px;
    }
    .dbnav__content .btn-wd {
        display: none;
    }
    .dbnav__content .btn-mb {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
    }
    #app > div.dash-board > div.dbnav > div > div.dbnav__short-info > div.more-setting > span {
        display: none;
    }
}
</style>
