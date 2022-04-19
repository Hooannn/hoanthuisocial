<template>
  <div @click='seenNoti' class="noti-com">
    <div v-if='type!="group"' class="status"><div v-if='noti.status=="Unseen"'></div></div>
    <div class="type">
        <ion-icon v-if="noti.type=='like-blog'" class='icon' name="heart-outline"></ion-icon>
        <ion-icon v-if="noti.type=='comment-blog'" class='icon' name="chatbox-outline"></ion-icon>
        <ion-icon v-if="noti.type=='new-blog'||noti.type=='group-new-blog'" class='icon' name="newspaper-outline"></ion-icon>
        <ion-icon v-if="noti.type=='send-message'" class='icon' name="chatbubbles-outline"></ion-icon>
        <ion-icon v-if="noti.type=='send-friendInvite'||noti.type=='group-user-request'" class='icon' name="person-add-outline"></ion-icon>
        <ion-icon v-if="noti.type=='accept-friendInvite'" class='icon' name="people-outline"></ion-icon>
        <ion-icon v-if="noti.type=='follow'" class='icon' name="eye-outline"></ion-icon>
        <ion-icon v-if="noti.type=='send-group-request'" class='icon' name="enter-outline"></ion-icon>
        <ion-icon v-if="noti.type=='accept-group-request'||noti.type=='group-user-accept'" class='icon' name="checkmark-outline"></ion-icon>
        <ion-icon v-if="noti.type=='refuse-group-request'||noti.type=='group-delete'" class='icon' name="close-outline"></ion-icon>
        <ion-icon v-if="noti.type=='group-create'" class='icon' name="checkmark-done"></ion-icon>
        <ion-icon v-if="noti.type=='group-user-leave'" class='icon' name="person-remove-outline"></ion-icon>
    </div>
    <div v-if='noti.type!="group-delete"' class="avatar"><img :src="ava['.value']" ></div>
    <div class="content">
        <span style='color:black' class='text'><Strong>{{noti.content}}</Strong></span>
        <div class="time">{{noti.date}}</div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../eventbus'
import router from '../../router/router'
import db from '../../plugins/firebase'
import store from '../../store/store'
export default {
    props: {
        notiKey:String,
        type:String,
        groupKey:String,
    },
    data() {
        return {
            noti:{},
            ava:{},
        }
    },
    methods: {
        seenNoti() {
            ///
            if (this.type=='group') {
                return
            }
            db.ref('usersInformation').child(this.$store.state.ukey).child('notifications').child(this.notiKey).child('status').set("Seen")
                .then(()=> {
                    if (this.noti.type=='follow' || this.noti.type=='accept-friendInvite' ) {
                        this.$router.push({name:'dhome'})
                        let ukey=this.noti.ukey
                        setTimeout(function() {
                            router.push({name:'post',params:{key:ukey}})
                        },50)
                    }
                    else if (this.noti.type=='send-friendInvite') {
                        this.$router.push({name:'dhome'})

                        setTimeout(function() {
                            router.push({name:'friends',params:{key:store.state.ukey}})
                        },50)
                    }
                    else if (this.noti.type=='like-blog'|| this.noti.type=='new-blog') {
                        this.$router.push({name:'dhome'})
                        let postKey=this.noti.postKey
                        let ukey=this.noti.ukey
                        setTimeout(function() {
                            router.push({name:'post-detail',params:{key:ukey,postKey:postKey}})
                        },50)
                    }
                    else if (this.noti.type=='comment-blog') {
                        let commentKey=this.noti.commentKey
                        this.$router.push({name:'dhome'})
                        let postKey=this.noti.postKey
                        let ukey=this.noti.ukey
                        setTimeout(function() {
                            router.push({name:'post-detail',params:{key:ukey,postKey:postKey}})
                        },50)
                        /*
                        setTimeout(function() {
                            EventBus.$emit('showCom', commentKey)
                        },100)
                        */
                    }
                    else if (this.noti.type=="send-group-request" ||this.noti.type=="accept-group-request"||this.noti.type=="refuse-group-request"|| this.noti.type=="group-create") {
                        this.$router.push({name:'dhome'})
                        let groupKey=this.noti.groupKey
                        setTimeout(function() {
                            router.push({name:'group',params:{key:groupKey}})
                        },50)
                    }
                    else if (this.noti.type=='send-message') {
                        this.$store.dispatch('addMsgData',this.noti.messageKey)
                    }
                    else {
                        return
                    }
                })
        }
    },
    mounted() {
        if (this.type!='group') {
            this.$rtdbBind('noti',db.ref('usersInformation').child(this.$store.state.ukey).child("notifications").child(this.notiKey))
            if (this.noti.type=="send-group-request" ||this.noti.type=="accept-group-request"||this.noti.type=="refuse-group-request"||this.noti.type=="group-create") {
                this.$rtdbBind('ava', db.ref('groups').child(this.noti.ukey).child('avatarImg'))
            }
            else {
                this.$rtdbBind('ava', db.ref('usersInformation').child(this.noti.ukey).child('avatarImg'))
            }
        }
        else if (this.type=='group') {
            this.$rtdbBind('noti',db.ref('groups').child(this.groupKey).child("notifications").child(this.notiKey))
            this.$rtdbBind('ava', db.ref('usersInformation').child(this.noti.ukey).child('avatarImg'))
            /*
            if (this.noti.type=="send-group-request" ||this.noti.type=="accept-group-request"||this.noti.type=="refuse-group-request"||this.noti.type=="group-create") {
                this.$rtdbBind('ava', db.ref('groups').child(this.noti.ukey).child('avatarImg'))
            }
            else {
                this.$rtdbBind('ava', db.ref('usersInformation').child(this.noti.ukey).child('avatarImg'))
            }
            */
        }
    }
};
</script>

<style>
div.noti-com {
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
div.noti-com:hover {
    background-color:white;
}
div.noti-com:hover .type .icon{
    background-color:white;
}
div.noti-com .status {
    width: 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
div.noti-com .status>div {
    width: 5px;
    height: 5px;
    background-color:orange;
    border-radius: 50%;
}
div.noti-com .type {
    width: 10px;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
}
div.noti-com .type .icon{
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
div.noti-com .content{
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    word-wrap: break-word;
    font-size: 13.5px;
}
div.noti-com .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgb(255, 69, 0,0.7);
}
div.noti-com .avatar img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>