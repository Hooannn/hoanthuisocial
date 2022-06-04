<template>
  <div v-if='messageKey!=""' @click='showMessage' class="message-user">
      
      <card-information style='fontSize:14px;padding:5px 0' :authorKey='ukey'/>
      
      <img :src="user.avatarImg">
      <!-- <span class='username'>{{user.username}}</span> -->
      <div v-if='unseenMsg>0' class='unseen-msg'>{{unseenMsg}}</div>
      <div :class='{online:user.status=="Online"}' class="status"></div>
      {{user.username}}
  </div>
</template>

<script>
import db from '../../plugins/firebase'
import CardInformation from '../Card/CardInformation.vue'
export default {
  components: { CardInformation },
    props: {
        ukey:String,
    },
    data() {
        return {
            user: {},
            messages:[],
            messagesData:[],
            messageKey:'',
            unseenMsg:0,
        }
    },
    methods: {
        showMessage(e) {
            if (
                e.target!=document.querySelector(`div.message-user.messagecontact${this.ukey}`)&&
                e.target!=document.querySelector(`div.message-user.messagecontact${this.ukey}>img`)&&
                e.target!=document.querySelector(`div.message-user.messagecontact${this.ukey} div.unseenMsg`)&&
                e.target!=document.querySelector(`div.message-user.messagecontact${this.ukey} div.status`)
                ) {
                return
            }
            if (this.messageKey!='' && this.messageKey!=null) {
                this.$store.dispatch('addMsgData', this.messageKey)
            }
            else {
                return
            }
        }
    },
    watch: {
        messages() {
            this.messages.forEach(message => {
                if (message['user1']==this.$store.state.ukey && message['user2']==this.ukey) {
                    this.messageKey=message[".key"]
                }
                else if (message['user2']==this.$store.state.ukey && message['user1']==this.ukey) {
                    this.messageKey=message[".key"]
                }
            });
            if (this.messageKey) {
                this.$store.state.currentContact++
                this.$rtdbBind('messagesData',db.ref('messagesData').child(this.messageKey).child('data'))
            }
        },
        messagesData() {
            this.unseenMsg=0
            this.messagesData.forEach(message => {
                if (message.author!=this.$store.state.ukey && message.status=='Unseen') {
                    this.unseenMsg++
                }
            })
        }
    },
    mounted() {
        this.$rtdbBind('user',db.ref('usersInformation').child(this.ukey))
        this.$rtdbBind('messages',db.ref('messagesData'))
    }
}
</script>

<style>
.message-user {
    cursor: pointer;
    display: flex;
    width: 100%;
    position: relative;
    padding:25px 0;
    transition: all .2s linear;
    align-items: center;
}
.message-user .card-information .ci-content .cic-body .cicb-image {
    width: 70px;
    height: 100%;
    display: flex;
    justify-content: center;
}
.message-user .card-information .ci-content .cic-body .cicb-image>div {
    max-width: 50px;
    max-height: 50px;
    border-radius: 50%;
}
.message-user .card-information .ci-content .cic-control button {
    width: 40%;
    font-size: 13px;
}
.message-user .card-information .ci-content .cic-body .cicb-detail>div:first-child {
    font-weight: bolder;
    color:steelblue;
    cursor: pointer;
    font-size: 16px;
}
.message-user>img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin:0 10px;
}
.message-user:hover {
    background-color:lightblue;
}
.message-user:hover .card-information{
    width: 250px;
    height: auto;
    opacity: 1;
    visibility: visible;
}
/*
.message-user .username{
    position: absolute;
    font-size: 14px;
    width: 100px;
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    word-wrap: break-word;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:5px;
    background-color: white;
    border-top:2px solid rgb(255, 117, 85);
    visibility: hidden;
    color:black;
    opacity: 0;
    transition: all .2s ease-in-out;
    border-radius: 5px;
    box-shadow: 0 0 3px rgb(0, 0, 0,0.3);
}

.message-user:hover .username{
    visibility: visible;
    opacity: 1;
    transform: translate(-140%,-50%);
}
*/
.message-user .status{
    width: 13px;
    height: 13px;
    border-radius: 50%;
    position: absolute;
    right:10px;
    background-color:grey;
}
.message-user .unseen-msg{
    width: 13px;
    height: 13px;
    border-radius: 3px;
    position: absolute;
    top: 0px;
    right: 1px;
    background-color:red;
    color:white;
    font-size: 11.3px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}
.message-user .status.online{
    background-color:green;
}
</style>