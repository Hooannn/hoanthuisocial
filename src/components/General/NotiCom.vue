<template>
  <div @click='seenNoti' class="noti-com">
    <div class="status"><div v-if='noti.status=="Unseen"'></div></div>
    <div class="type">
        <ion-icon v-if="noti.type=='like-blog'" class='icon' name="heart-outline"></ion-icon>
        <ion-icon v-if="noti.type=='comment-blog'" class='icon' name="chatbox-outline"></ion-icon>
        <ion-icon v-if="noti.type=='new-blog'" class='icon' name="newspaper-outline"></ion-icon>
        <ion-icon v-if="noti.type=='send-message'" class='icon' name="chatbubbles-outline"></ion-icon>
        <ion-icon v-if="noti.type=='send-friendInvite'" class='icon' name="person-add-outline"></ion-icon>
        <ion-icon v-if="noti.type=='accept-friendInvite'" class='icon' name="people-outline"></ion-icon>
        <ion-icon v-if="noti.type=='follow'" class='icon' name="eye-outline"></ion-icon>
    </div>
    <div class="avatar"><img :src="ava['.value']" ></div>
    <div class="content">
        <span style='color:black' class='text'><Strong>{{noti.content}}</Strong></span>
        <div class="time">{{noti.time}}</div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../eventbus'
import db from '../../plugins/firebase'
export default {
    props: {
        notiKey:String
    },
    data() {
        return {
            noti:{},
            ava:{},
        }
    },
    methods: {
        seenNoti() { 
            db.ref('usersInformation').child(this.$store.state.ukey).child('notifications').child(this.notiKey).child('status').set("Seen")
                .then(()=> {
                    if (this.noti.type=='follow' || this.noti.type=='accept-friendInvite' ) {
                        this.$router.push({name:'post',params:{key:this.noti.ukey}})
                    }
                    else if (this.noti.type=='send-friendInvite') {
                        this.$router.push({name:'friends',params:{key:this.$store.state.ukey}})
                    }
                    else if (this.noti.type=='like-blog'|| this.noti.type=='new-blog') {
                        this.$router.push({name:'post-detail',params:{key:this.noti.ukey,postKey:this.noti.postKey}})
                    }
                    else if (this.noti.type=='comment-blog') {
                        let commentKey=this.noti.commentKey
                        this.$router.push({name:'post-detail',params:{key:this.noti.ukey,postKey:this.noti.postKey}})
                        /*
                        setTimeout(function() {
                            EventBus.$emit('showCom', commentKey)
                        },100)
                        */
                    }
                    else if (this.noti.type=='send-message') {
                        return
                    }
                    else {
                        return
                    }
                })
        }
    },
    mounted() {
        this.$rtdbBind('noti',db.ref('usersInformation').child(this.$store.state.ukey).child("notifications").child(this.notiKey))
        this.$rtdbBind('ava', db.ref('usersInformation').child(this.noti.ukey).child('avatarImg'))
    }
};
</script>

<style>
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com {
    width: 100%;
    min-height: 80px;
    max-height: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    padding:0;
    margin:0;
}
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com:hover {
    background-color:white;
}
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com:hover .type .icon{
    background-color:white;
}
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com .status {
    width: 3%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com .status>div {
    width: 5px;
    height: 5px;
    background-color:orange;
    border-radius: 50%;
}
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com .type {
    width: 3%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
}
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com .type .icon{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    font-size: 20px;
    z-index: 10;
    padding:10px 0;
    background-color:rgb(243, 234, 224);
    color: rgb(51, 51, 51);
}
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com .content{
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    word-wrap: break-word;
    font-size: 13.5px;
}
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgb(255, 69, 0,0.7);
}
#app > div > div.dbnav > div > div.dbnav__notifications > div > div.noti-com .avatar img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>