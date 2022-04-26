<template>
  <div class="mini-message">
      <div @click='minimize' class="header">
          <div class="target">
            <div class="avatar">
                <img style='width:100%;height:100%;objectFit:cover' :src="contactUser.avatarImg">
            </div>
            <div style='display:flex;justifyContent:center;flexDirection:column'>
                <div @click.prevent='minimize' @click='viewProfile(contactUser[".key"])' style='fontSize:13.5px;cursor:pointer' class="username">
                    {{contactUser.username}}
                </div>
                <div style='display:flex;alignItems:center;fontSize:12px;color:whitesmoke' class="status">
                    <div :class='{online:contactUser.status=="Online"}' class="icon"></div>
                    <span class="text">{{contactUser.status}}</span>
                </div>
            </div>
          </div>
          <div class="control"> 
              <div @click.prevent='minimize' style='display:flex;justifyContent:center;alignItems:center' class="delete"><i style='cursor:pointer;fontSize:16px' @click='close' class="fas fa-times"></i></div>
          </div>
      </div>
      <div class="content">
          <!-- message -->
          <message-com v-for='msg in messageData' :key='msg[".key"]' :class='msg[".key"]' :msg='msg'/>
      </div>
      <div class="input">
          <input @focus="getLastestMsg" @keypress.enter="sendMsg" placeholder="Message..." v-model='inputMsg' type="text" id="input-message">
          <div class="control">
              <div class='icon' style='display:flex;justifyContent:center;alignItems:center'><ion-icon name="image-outline"></ion-icon></div>
              <div @click='sendMsg' class='icon' style='display:flex;justifyContent:center;alignItems:center'><ion-icon name="send-outline"></ion-icon></div>
          </div>
      </div>
  </div>
</template>

<script>
import store from '../../store/store'
import router from '../../router/router'
import db from '../../plugins/firebase'
import MessageCom from './MessageCom.vue'
export default {
  components: { MessageCom },
    props:{
        messageKey:String
    },
    data() {
        return {
            message:{},
            contactUser:{},
            messageData:[],
            inputMsg:'',
        }
    },
    methods: {
        getLastestMsg() {
            let msgContent=document.querySelector(`#app > div.dash-board > div.messages-m-container > div.mini-message.${this.messageKey} > div.content`)
            setTimeout(function(){
                msgContent.scrollTop=msgContent.scrollHeight
            },10) 
        },
        sendMsg() {
            let msg = {
                time:new Date().getTime(),
                date:new Date().toLocaleString(),
                content:this.inputMsg,
                author:this.$store.state.ukey,
                status:'Unseen'
            }
            if (this.inputMsg!=null && this.inputMsg.trim()!='') {
                db.ref('messagesData').child(this.messageKey).child('data').push(msg)
                //notification
                /*
                let noti= {
                    time:new Date().getTime(),
                    date:new Date().toLocaleString(),
                    content:`${this.$store.state.username} has sent you a message.`,
                    status:'Unseen',
                    type:'send-message',
                    ukey:this.$store.state.ukey,
                    messageKey:this.messageKey,
                }
                db.ref('usersInformation').child(this.contactUser[".key"]).child('notifications').push(noti)
                */
                this.inputMsg=''
            }
            else {
                return
            }
        },
        viewProfile(key) {
            router.push({name:'post',params:{key:key}})
        },
        minimize() {
            let msg=document.querySelector(`#app > div.dash-board > div.messages-m-container > div.mini-message.${this.messageKey}`)
            let msgContent=document.querySelector(`#app > div.dash-board > div.messages-m-container > div.mini-message.${this.messageKey} > div.content`)
            let msgInput=document.querySelector(`#app > div.dash-board > div.messages-m-container > div.mini-message.${this.messageKey} > div.input`)
            if (msg!=null && msg!=undefined) {
                msg.classList.toggle('show')
            }
            
            if (msgContent!=null && msgContent!=undefined) {
                msgContent.classList.toggle('show')
            }
            if (msgInput!=null && msgInput!=undefined) {
                msgInput.classList.toggle('show')
            }
            
        },
        close() {
            let msg=document.querySelector(`#app > div.dash-board > div.messages-m-container > div.mini-message.${this.messageKey}`)
            msg.remove()
            this.$store.dispatch('removeMsgData',this.messageKey)        
        }
    },
    watch: {
        messageData() {
            this.getLastestMsg()
            this.messageData.forEach(message => {
                if (message.author!=this.$store.state.ukey) {
                    db.ref('messagesData').child(this.messageKey).child('data').child(message[".key"]).child('status').set('Seen')
                }
            });
        }
    },
    mounted() {
        this.getLastestMsg()
        this.$rtdbBind('messageData',db.ref('messagesData').child(this.messageKey).child('data'))
        this.$rtdbBind('message',db.ref('messagesData').child(this.messageKey))
        if (this.message['user1']==this.$store.state.ukey) {
            this.$rtdbBind('contactUser',db.ref('usersInformation').child(this.message['user2']))
        }
        else if (this.message['user2']==this.$store.state.ukey) {
            this.$rtdbBind('contactUser',db.ref('usersInformation').child(this.message['user1']))
        }
    }
}
</script>

<style>
.mini-message ::placeholder {
    color:white;
    font-size: 12px;
}
.mini-message {
    pointer-events:all;
    height: 350px;
    width: 280px;
    display: flex;
    flex-direction:column;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.4);
    margin:0 10px;
    transition: .2s;
    overflow: hidden;
}
.mini-message.show {
    transform: translateY(300px);
}
/* header */
.mini-message .header{
    height: 50px;
    width: 100%;
    background-color:rgb(255, 117, 85);
    display: flex;
    align-items: center;
    color:white;
    cursor: pointer;
}
.mini-message .header .target{
    width: 85%;
    height: 100%;
    align-items: center;
    display: flex;
}
.mini-message .header .target>div div.username:hover {
   text-decoration-line: underline;
}
.mini-message .header .target>div .status .icon{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color:grey;
    margin-right: 5px;
}
.mini-message .header .target>div .status .icon.online{
    background-color:green;
}
.mini-message .header .target .avatar{
    width: 33px;
    height: 33px;
    border-radius: 50%;
    overflow: hidden;
    border:1.5px solid white;
    margin:0 5px;
}
.mini-message .header .control{
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 22px;
}
/* content */
.mini-message .content{
    height: 265px;
    max-height: 265px;
    overflow-y:auto;
    width: 100%;
    background-color:white;
}
.mini-message .content.show{
    height: 0;
    visibility: hidden;
}
/* input */
.mini-message .input{
    height: 35px;
    width: 100%;
    display: flex;
}
.mini-message .input.show{
    height: 0;
    visibility: hidden;
}
.mini-message .input input{
    width: 75%;
    height: 100%;
    border:none;
    outline:none;
    color:white;
    background-color:grey;
    font-size: 14px;
}
.mini-message .input .control{
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.mini-message .input .control .icon{
    background-color: #313131;
    width: 100%;
    height: 100%;
    color:white;
    cursor: pointer;
    transition: .1s;
}
.mini-message .input .control .icon:hover{
    background-color:white;
    color:black;
}

/*  */
@media only screen and (max-width: 768px) {
    
}
</style>