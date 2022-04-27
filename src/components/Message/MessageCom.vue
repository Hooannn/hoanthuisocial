<template>
  <div @click='closeOptions' class="message-com" :class='{owner:$store.state.ukey==msg.author}'>
      <div v-if='images.length>0' class="image-review">
          <ion-icon @click='back' onMouseOut='this.style.backgroundColor="unset"' onMouseOver='this.style.backgroundColor="rgba(0,0,0,0.1)"' style='transition:.1s linear;position:absolute;top:0;left:0;padding:5px;color:orangered;fontSize:20px;fontWeight:bolder;cursor:pointer' name="return-up-back-outline"></ion-icon>
          <ion-icon @click='previousImg' onMouseOut='this.style.fontSize="20px"' onMouseOver='this.style.fontSize="22px"' style='transition:.1s linear;position:absolute;top:50%;transform:translateY(-50%);left:0;padding:0;color:orangered;fontSize:20px;fontWeight:bolder;cursor:pointer' name="chevron-back-outline"></ion-icon>
          <ion-icon @click='nextImg' onMouseOut='this.style.fontSize="20px"' onMouseOver='this.style.fontSize="22px"' style='transition:.1s linear;position:absolute;top:50%;transform:translateY(-50%);right:0;padding:0;color:orangered;fontSize:20px;fontWeight:bolder;cursor:pointer' name="chevron-forward-outline"></ion-icon>
          <img :key='selectedImg' :class='slide' :src="images[selectedImg]['.value']">
      </div>
      <div v-if='$store.state.ukey!=msg.author' class='avaImg'><img :src="author.avatarImg"></div>
      <div :class='{owner:$store.state.ukey==msg.author}' class='msg-content'>
          <ion-icon v-if='$store.state.ukey==msg.author' onMouseOut='this.style.color="black"' onMouseOver='this.style.color="orangered"' @click='showOptions' style='position:absolute;top:50%;transform:translateY(-50%);left:-15px;color:black;cursor:pointer' name="ellipsis-vertical-outline"></ion-icon>
          <div style='position:absolute;top:50%;transform:translateY(-50%);left:-68px;color:black;backgroundColor:whitesmoke;boxShadow:0 0 3px rgba(0,0,0,0.5)' class="options">
              <span @click='deleteMsg' onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orangered"' style='padding:5px;cursor:pointer'>Delete</span>
          </div>
          <div style='fontSize:11px;opacity:0.8'>{{msg.date}}</div>
          <div>{{msg.content}}</div>
          <div style='backgroundColor:rgba(255,255,255,0.2);width:100%;display:flex;flexWrap:wrap'>
              <div style='width:50%;padding:2.5px;maxHeight:80px;position:relative' v-for='(img,index) in images' :key='index' :class='"image"+index'>
                  <img @click='reviewImg(index)' onMouseOver='this.style.opacity="0.8"' onMouseOut='this.style.opacity="1"' style='cursor:pointer;width:100%;height:100%;objectFit:contain' :src="img['.value']">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props: {
        msg:Object,
        msgKey:String,
        messageKey:String,
    },
    data() {
        return {
            author:{},
            selectedImg:0,
            slide:'',
            images:[]
        }
    },
    methods:{
        deleteMsg() {
            this.$bvModal.msgBoxConfirm('Your message will be deleted ?',{
                    title: 'Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Delete',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        this.$store.dispatch('loading')
                        let key=this.msg[".key"]
                        db.ref('messagesData').child(this.messageKey).child('data').child(this.msgKey).remove().then(()=>{
                            //let msgcom=document.querySelector(`#app > div.dash-board > div.messages-m-container > div > div.content > div.message-com.owner.${key}`)
                            //msgcom.remove()
                            this.$store.dispatch('unload')
                        }).catch((err)=>{
                            alert(err)
                            this.$store.dispatch('unload')
                        })
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
        },
        closeOptions(e) {
            let key=this.msg[".key"]
            let options=document.querySelector(`#app > div.dash-board > div.messages-m-container > div > div.content > div.message-com.owner.${key} > div > div.options`)
            let msgCom=document.querySelector(`#app > div.dash-board > div.messages-m-container > div > div.content > div.message-com.owner.${key}`)
            if (e.target==msgCom) {
                options.classList.remove('show')
            }
        },
        showOptions() {
            let key=this.msg[".key"]
            let options=document.querySelector(`#app > div.dash-board > div.messages-m-container > div > div.content > div.message-com.owner.${key} > div > div.options`)
            options.classList.toggle('show')
        },
        reviewImg(index) {
            this.slide=''
            this.selectedImg=index
            let key=this.msg[".key"]
            let imgReview=document.querySelector(`#app > div.dash-board > div.messages-m-container > div > div.content > div.message-com.${key} > div.image-review`)
            imgReview.classList.add('show')
        },
        back() {
            let key=this.msg[".key"]
            let imgReview=document.querySelector(`#app > div.dash-board > div.messages-m-container > div > div.content > div.message-com.${key} > div.image-review`)
            imgReview.classList.remove('show')
        },
        previousImg() {
            this.slide='slide-left'
            this.selectedImg--
            if (this.selectedImg==-1) {
                this.selectedImg=this.images.length-1
            }
        },
        nextImg() {
            this.slide='slide-right'
            this.selectedImg++
            if (this.selectedImg==this.images.length) {
                this.selectedImg=0
            }
        }
    },
    mounted() {
        this.$rtdbBind('author',db.ref('usersInformation').child(this.msg.author))
        this.$rtdbBind('images',db.ref('messagesData').child(this.messageKey).child('data').child(this.msgKey).child('images'))
    }
}
</script>

<style>
.message-com {
    width: 100%;
    padding:8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.message-com .image-review{
    width: 0;
    height: 0;
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    z-index: 20;
    background-color:white;
    transition:all .2s linear;
}
.message-com .image-review.show{
    width: 280px;
    height: 350px;
    opacity: 1;
    visibility: visible;
}
.message-com .image-review img{
    height: 100%;
    width: 100%;
    object-fit: contain;
    padding:10px;
}
.message-com .image-review img.slide-right{
    animation: slide-right .3s linear;
}
.message-com .image-review img.slide-left{
    animation: slide-left .3s linear;
}
@keyframes slide-right {
    0% {
        transform:translateX(-100%)
    }
    100% {
        transform:translateX(0)
    }
}
@keyframes slide-left {
    0% {
        transform:translateX(100%)
    }
    100% {
        transform:translateX(0)
    }
}
.message-com.owner {
    flex-direction: row-reverse;
}
.message-com .avaImg{
    width: 27px;
    height: 27px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5px;
}
.message-com .avaImg img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.message-com .msg-content{
    max-width: 75%;
    word-wrap: break-word;
    font-size: 13.5px;
    padding:3px;
    background-color:rgba(0,0,0,0.5);
    border-radius: 3px;
    color:white;
    position: relative;
}
.message-com .msg-content .options{
    visibility: hidden;
    opacity: 0;
}
.message-com .msg-content .options.show{
    visibility: visible;
    opacity: 1;
}
.message-com .msg-content.owner{
    background-color: rgb(255, 117, 85);
    text-align: end;
}  
</style>