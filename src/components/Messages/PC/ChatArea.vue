<template>
  <div class="chat-area">
      <div v-if="load" class="message-load"></div>
      <div v-if="contact.avatarImg&&contact.status" class="ca-header">
          <div class="cah-info">
              <div class="cahi-avatar" style='position:relative'>
                  <img :src="contact.avatarImg" alt="Avatar image">
                  <div :class='{online:contact.status=="Online",offline:contact.status=="Offline"}' class="cahi-status"></div>
              </div>
              <div style='marginLeft:5px' class="cahi-sinfo">
                  <div @click='$router.push({name:"post",params:{key:contact[".key"]}})' onMouseOver='this.style.textDecoration="underline"' onMouseOut='this.style.textDecoration="unset"' style='fontWeight:bolder;cursor:pointer' class="cahis-username">{{contact.username}}</div>
                  <div style='color:slategray;fontSize:15px' class="cahis-lastlogin">Online <span v-if='contact.status=="Offline"'>{{getTime.toLowerCase()}}</span></div>
              </div>
          </div>
          <div class="cah-control">
              <div onMouseOver='this.style.backgroundColor="rgb(24, 141, 131,0.7)";this.style.boxShadow="none"' onMouseOut='this.style.backgroundColor="#188d83";this.style.boxShadow="1px 1px 2px rgb(0 0 0 / 30%)"' style='backgroundColor:#188d83;borderRadius:3px;width:50px;height:30px;boxShadow:1px 1px 2px rgb(0 0 0 / 30%);cursor:pointer' class="video center"><i style=';fontSize:13px' class="fas fa-video"></i></div>
              <div onMouseOver='this.style.backgroundColor="rgb(79, 148, 204,0.7)";this.style.boxShadow="none"' onMouseOut='this.style.backgroundColor="#4f94cc";this.style.boxShadow="1px 1px 2px rgb(0 0 0 / 30%)"' style='backgroundColor:#4f94cc;borderRadius:3px;width:50px;height:30px;boxShadow:1px 1px 2px rgb(0 0 0 / 30%);cursor:pointer' class="call center"><i style='fontSize:13px' class="fas fa-phone"></i></div>
              <div onMouseOver='this.style.backgroundColor="rgb(192, 192, 192,0.7)";this.style.boxShadow="none"' onMouseOut='this.style.backgroundColor="silver";this.style.boxShadow="1px 1px 2px rgb(0 0 0 / 30%)"' style='backgroundColor:silver;borderRadius:3px;width:50px;height:30px;boxShadow:1px 1px 2px rgb(0 0 0 / 30%);cursor:pointer' class="delete center"><i style='fontSize:13px' class="fas fa-ellipsis-h"></i></div>
          </div>
      </div>
      <div v-if="!load" class="ca-messages">
          <message-com :contactImg='contact.avatarImg' v-for='msg in messages' :key='msg[".key"]' :messageKey='$route.params.id' :class='msg[".key"]' :msg='msg' :msgKey="msg['.key']"/>
      </div>
      <div v-if="!load" class="ca-input">
          <div v-if='images.length>0' class="cai-images">
              <div @click='uploadImages' class="add-more center">
                  <ion-icon name="camera-outline"></ion-icon>
              </div>
              <div style='position:relative' class='cai-image' v-for='(image,index) in images' :key='"imgUpload"+index' >
                  <div @click='removeImg(image)' onMouseOut='this.style.color="unset",this.style.transform="scale(1)"' onMouseOver='this.style.color="orangered",this.style.transform="scale(1.1)"' style='transition:.1s linear;cursor:pointer;position:absolute;top:0;right:0;fontSize:20px;'><ion-icon name="close-circle-outline"></ion-icon></div>
                  <img :src="image" alt="image">
              </div>
          </div>
          <ion-icon @click='uploadImages' style='color:var(--dark)' class='icon' name="images"></ion-icon>
          <input @focus='getLastestMsg()' @keypress.enter="sendMessage" v-model='text' placeholder="Message..." type="text">
          <ion-icon @click='sendMessage' style='color:var(--dark)' class='icon' name="send"></ion-icon>
          <ion-icon style='color:var(--cyan)' class='icon' name="happy"></ion-icon>
          <ion-icon style='color:var(--danger)' class='icon' name="heart"></ion-icon>
      </div>
  </div>
</template>

<script>
import client from '@/plugins/filestack'
import db from '@/plugins/firebase'
import MessageCom from '@/components/MessageMini/MessageCom.vue'
export default {
  components: { MessageCom },
    props:{
        messages:Array,
        contact:Object,
        load:Boolean,
    },
    data() {
        return {
            images:[],
            text:''
        }
    },
    watch: {
        messages() {
            this.getLastestMsg()
            this.messages.forEach(message => {
                if (message.author!=this.$store.state.ukey) {
                    db.ref('messagesData').child(this.$route.params.id).child('data').child(message[".key"]).child('status').set('Seen')
                }
            });
        }
    },
    methods:{
        removeImg(img) {
            this.images.splice(this.images.indexOf(img),1)
        },
        uploadImages() {
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
        sendMessage() {
            let msg = {
                time:new Date().getTime(),
                date:new Date().toLocaleString(),
                content:this.text,
                author:this.$store.state.ukey,
                status:'Unseen',
                images:this.images
            }
            if ((this.text!=null && this.text.trim()!='') || (this.images.length!=0)) {
                db.ref('messagesData').child(this.$route.params.id).child('data').push(msg)
                    .then(res=>{

                    })
                    .catch(err=>{
                        this.$bvToast.show('msg-err')
                    })
                this.text=''
                this.images=[]
            }
            else {
                return
            }
        },
        getLastestMsg() {
            let msgContent=document.querySelector(`#app > div.dash-board > div.messages-view > div.message-body > div.chat-area > div.ca-messages`)
            setTimeout(function(){
                if (msgContent) {
                    msgContent.scrollTop=msgContent.scrollHeight
                }
            },10) 
        },
    },
    computed: {
        getTime() {
            let time=(new Date().getTime()-(this.contact['Last Login']))/1000
            time = parseInt(time, 10);
            let hours   = Math.floor(time / 3600);
            let minutes = Math.floor((time - (hours * 3600)) / 60);
            let seconds = time - (hours * 3600) - (minutes * 60);
            let days=Math.floor(hours/24)
            let weeks=Math.floor(days/7)
            let months=Math.floor(weeks/4)
            let years=Math.floor(months/12)
            if (years!=0) {
                if (years==1) {
                    return `A year ago.`
                }
                else  {
                    return `${years} years ago.`
                }
            }
            if (minutes==0 && hours==0) {
                if (seconds==1||seconds==0) {
                    return `A second ago.`
                }
                else {
                    return `${seconds} seconds ago.`
                }
            }
            else if (hours==0 && minutes!=0) {
                if (minutes==1) {
                    return `A minute ago.`
                }
                else {
                    return `${minutes} minutes ago.`
                }
            }
            else if (days==0 && hours!=0) {
                if (hours==1) {
                    return `A hour ago.`
                }
            else {
                return `${hours} hours ago.`
            }
            }
            else if (weeks==0 && days!=0) {
                if (days==1) {
                    return `A day ago.`
                }
            else {
                return `${days} days ago.`
            }
            }
            else if (months==0 && weeks!=0) {
                if (weeks==1) {
                    return `A week ago.`
                }
                else {
                return `${weeks} weeks ago.`
                }
            }
            else if (years==0 && months!=0) {
                if (months==1) {
                    return `A month ago.`
                }
                else {
                    return `${months} months ago.`
                }
            }
        }
    },
    mounted() {
        setTimeout(function(){
            let msgContent=document.querySelector(`#app > div.dash-board > div.messages-view > div.message-body > div.chat-area > div.ca-messages`)
            msgContent.scrollTop=msgContent.scrollHeight
        },10) 
    }
}
</script>

<style>
.message-load {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border:10px solid white;
    border-top-color:var(--blue);
    position: absolute;
    top:40%;
    left:48.9%;
    animation: spin .4s linear infinite;
}
.chat-area {
    max-width: 70%;
    width: 70%;
    border-right:1px solid silver;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    position: relative;
}
.chat-area .ca-header {
    min-height: 60px;
    height: 60px;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    background-color:rgba(255,255,255,0.5);
    display: flex;
    justify-content: space-between;
}
.chat-area .ca-messages {
    padding-bottom:120px;
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
}

.chat-area .ca-header .cah-info {
    display: flex;
    align-items: center;
    padding:0 10px;
}
.chat-area .ca-header .cah-control {
    display: flex;
    align-items: center;
}
.chat-area .ca-header .cah-control div {
    margin:0 5px;
    color:white;
}
.chat-area .ca-header .cah-info .cahi-status {
    width: 14px;
    height: 14px;
    background-color:black;
    border-radius: 50%;
    position: absolute;
    bottom:-1px;
    right:-1px;
}
.chat-area .ca-header .cah-info .cahi-status.online {
    background-color:green;
}
.chat-area .ca-header .cah-info .cahi-status.offline {
    background-color:slategray;
}
.chat-area .ca-header .cah-info .cahi-avatar img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
}

/* input */
.chat-area .ca-input {
    position: absolute;
    min-height: 60px;
    height: 60px;
    bottom:0;
    left:0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:rgba(229, 240, 248);
}
.chat-area .ca-input input {
    background-color:rgb(240, 232, 232,0.3);
    border:none;
    outline:none;
    border:1px solid silver;
    border-radius: 50px;
    padding:8px 10px;
    font-size: 15px;
    font-weight: bold;
    width: 100%;
}
.chat-area .ca-input input:focus {
    border:2px solid orange;
}
.chat-area .ca-input .icon {
    min-width: 28px;
    min-height: 28px;
    margin:0 5px;
    cursor: pointer;
}
.chat-area .ca-input .icon:hover {
    opacity: 0.8;
}
.chat-area .ca-input .cai-images {
    position: absolute;
    bottom:100%;
    width:95%;
    max-height: 300px;
    z-index: 2;
    background-color:rgba(229, 240, 248);
    overflow-y:auto;
    display: flex;
    flex-wrap: wrap;
}
.chat-area .ca-input .cai-images .add-more:hover {
    color:orange;
    border-color: orange;
}
.chat-area .ca-input .cai-images .add-more {
    width: 100px;
    height: 100px;
    border:1px solid slategrey;
    margin:10px;
    color:slategrey;
    font-size: 30px;
    cursor: pointer;
    border-radius: 10px;
    transition:.2s linear;
}
.chat-area .ca-input .cai-images .cai-image img{
    max-height: 100px;
    margin:10px;
}

/* message com override */
.chat-area .ca-messages .message-com {
    width: 100%;
    display: flex;
    align-items: center;
    padding:15px 8px;
    justify-content: flex-start;
}
.chat-area .ca-messages .message-com .image-review.show{
    width: 100%;
    height: 100%;
    opacity: 1;
    visibility: visible;
}
.chat-area .ca-messages .message-com .image-review img{
    height: 100%;
    width: 100%;
    object-fit: contain;
    padding:10px;
}
.chat-area .ca-messages .message-com.owner {
    padding:20px 8px;
}
.chat-area .ca-messages .message-com .avaImg{
    width: 33px;
    height: 33px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5px;
}
.chat-area .ca-messages .message-com .msg-content{
    max-width: 75%;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 15px;
    padding:3px;
    background-color:rgba(0,0,0,0.5);
    border-radius: 3px;
    color:white;
    position: relative;
}
.chat-area .ca-messages .message-com .msg-content.owner{
    background-color: rgb(255, 117, 85);
}
.chat-area .ca-messages .message-com .msg-content .msgc-date {
    font-size:12.5px;
}
.chat-area .ca-messages .message-com .msg-content .msgc-images .msgc-image {
    padding:2.5px;
    height:200px;
    position:relative;
}
</style>