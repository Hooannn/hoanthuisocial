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
              <div @click='makeACall' @click.prevent='minimize' onMouseOver='this.style.backgroundColor="rgb(24, 141, 131,0.7)";this.style.boxShadow="none"' onMouseOut='this.style.backgroundColor="#188d83";this.style.boxShadow="1px 1px 2px rgb(0 0 0 / 30%)"' style='backgroundColor:#188d83;borderRadius:3px;width:30px;height:20px;boxShadow:1px 1px 2px rgb(0 0 0 / 30%)' class="video center"><i style='cursor:pointer;fontSize:12px' class="fas fa-video"></i></div>
              <div @click='makeACall' @click.prevent='minimize' onMouseOver='this.style.backgroundColor="rgb(79, 148, 204,0.7)";this.style.boxShadow="none"' onMouseOut='this.style.backgroundColor="#4f94cc";this.style.boxShadow="1px 1px 2px rgb(0 0 0 / 30%)"' style='backgroundColor:#4f94cc;borderRadius:3px;width:30px;height:20px;boxShadow:1px 1px 2px rgb(0 0 0 / 30%)' class="call center"><i style='cursor:pointer;fontSize:12px' class="fas fa-phone"></i></div>
              <div onMouseOver='this.style.backgroundColor="rgb(255, 0, 0,0.7)";this.style.boxShadow="none"' onMouseOut='this.style.backgroundColor="red";this.style.boxShadow="1px 1px 2px rgb(0 0 0 / 30%)"' style='backgroundColor:red;borderRadius:3px;width:30px;height:20px;boxShadow:1px 1px 2px rgb(0 0 0 / 30%)' @click.prevent='minimize' @click='close' class="delete center"><i style='cursor:pointer;fontSize:15px' class="fas fa-times"></i></div>
          </div>
      </div>
      <div class="content">
          <!-- message -->
          <message-com :contactImg='contactUser.avatarImg' v-for='msg in messageData' :key='msg[".key"]' :messageKey='messageKey' :class='msg[".key"]' :msg='msg' :msgKey="msg['.key']"/>
      </div>
      <div class="input">
          <div class="images">
              <div style='position:relative' v-for='(image,index) in images' :key='index' class="image">
                <ion-icon @click='removeImg(image)' style='cursor:pointer;position:absolute;top:0;right:0;color:orangered;' onMouseOver='this.style.transform="scale(1.1)"' onMouseOut='this.style.transform="scale(1)"' name="close-circle-outline"></ion-icon>
                <img :src="image">
              </div>
          </div>
          <input @focus="getLastestMsg" @keypress.enter="sendMsg" placeholder="Message..." v-model='inputMsg' type="text" id="input-message">
          <div class="control">
              <div @click='uploadImgs' class='icon' style='display:flex;justifyContent:center;alignItems:center'><ion-icon name="image-outline"></ion-icon></div>
              <div @click='sendMsg' class='icon' style='display:flex;justifyContent:center;alignItems:center'><ion-icon name="send-outline"></ion-icon></div>
          </div>
      </div>
  </div>
</template>

<script>
import store from '../../store/store'
import client from '../../plugins/filestack'
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
            images:[],
            inputMsg:'',
        }
    },
    methods: {
        uploadImgs() {
            const options = {
                accept: ["image/*"],
                maxFiles: 20,
                uploadInBackground: false,
                onUploadDone: (res) => {
                    let images = res.filesUploaded.map((item) => item.url);
                    if (images.length == 1 ) {
                        this.images.push(images[0]);
                    } else if (images.length > 1 ) {
                        this.images = [...this.images, ...images];
                    }
                },
            };
            client.picker(options).open();
        },
        removeImg(img) {
            let index=this.images.indexOf(img)
            this.images.splice(index,1)
        },
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
                status:'Unseen',
                images:this.images
            }
            if ((this.inputMsg!=null && this.inputMsg.trim()!='') || (this.images.length!=0)) {
                db.ref('messagesData').child(this.messageKey).child('data').push(msg)
                    .then(res=>{

                    })
                    .catch(err=>{
                        this.$bvToast.show('msg-err')
                    })
                this.inputMsg=''
                this.images=[]
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
        },
        /*  */
        makeACall() {
            if (this.contactUser.call=="oncall" || this.contactUser.status=='Offline') {
                this.$bvToast.show('busy-call')
                return
            }
            this.close()
            let newCall={
                call:{
                    key:this.$store.state.ukey,
                    image:this.$store.state.avatarImg,
                    name:this.$store.state.username
                },
                contact:this.contactUser[".key"],
                status:'Waiting'
            }
            this.$store.dispatch('makeACall',newCall)
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
        this.$rtdbBind('messageData',db.ref('messagesData').child(this.messageKey).child('data'))
        this.$rtdbBind('message',db.ref('messagesData').child(this.messageKey))
        if (this.message['user1']==this.$store.state.ukey) {
            this.$rtdbBind('contactUser',db.ref('usersInformation').child(this.message['user2']))
        }
        else if (this.message['user2']==this.$store.state.ukey) {
            this.$rtdbBind('contactUser',db.ref('usersInformation').child(this.message['user1']))
        }
        this.getLastestMsg()
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
    position: relative;
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
    width: 50%;
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
    max-width: 33px;
    max-height: 33px;
    border-radius: 50%;
    overflow: hidden;
    border:1.5px solid white;
    margin:0 5px;
}
.mini-message .header .control{
    width: 50%;
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
    position: relative;
}
.mini-message .input .images{
    width: 100%;
    position: absolute;
    bottom:100%;
    display: flex;
    flex-wrap: wrap;
    max-height: 100px;
    overflow-y:auto;
    background-color:whitesmoke;
    box-shadow: 0 0 2px rgba(0,0,0,0.4);
}
.mini-message .input .images .image{
    width: 25%;
    padding:5px 2px;
    max-height: 70px;
    object-fit: contain;
}
.mini-message .input .images .image img{
    object-fit: contain;
    width: 100%;
    height: 100%;
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