<template>
  <div class="information-area" :style={backgroundColor:$store.state.messagetheme.bgColor,color:$store.state.messagetheme.color}>
      <div v-if='load' class="message-load"></div>
      <div class='ia-inner' v-if='!load'>
          <div class="ia-header">
              <div v-if='$route.name=="message_m-detail"' @click='closeInfo' class='center' style='width:50px;height:50px;position:absolute;left:15px;top:15px;fontSize:20px;'><ion-icon name="return-down-back-outline"></ion-icon></div>
              <div class="iah-avatar"><img style='width:100%;height:100%;objectFit:cover' :src="contact.avatarImg" alt="Avatar image"></div>
              <div style='fontWeight:bolder' class="iah-username">{{contact.username}}</div>
              <div style='fontSize:15px' class="iah-lastlogin">
                  <span style='display:inline-block;width:10px;height:10px;borderRadius:50%;' :class='{online:contact.status=="Online",offline:contact.status=="Offline"}'></span>
                  Online 
                  <span v-if='contact.status=="Offline"'>{{getTime.toLowerCase()}}</span>
              </div>
              <button @click='$router.push({name:"post",params:{key:contact[".key"]}})' class="btn btn-sm btn-link">View Profile</button>
          </div>
          <div class="ia-body">
              <div class='iab-item'>
                  <div @click='showTheme' class="iabi-title">
                    <span>Theme</span><span><ion-icon :name="'chevron-'+icon_th+'-outline'"></ion-icon></span>
                  </div>
              </div>
              <div class="iab-theme">
                  <div @click='changeTheme(t)' :class='{selected:t.name==$store.state.messagetheme.name}' v-for='(t,index) in themes' :style={color:t.bgColor,borderColor:t.bgColor} :key='"msgtheme"+index' class='iabt-item center'>
                      {{t.name}}
                  </div>
              </div>
              <div class='iab-item'>
                  <div @click='showImageSent' class="iabi-title">
                      <span>File, images <span v-if='images.length>0' style='fontSize:14px'><ion-icon style='fontSize:9px;color:slategrey' name="ellipse"></ion-icon> {{images.length}}</span></span><span><ion-icon :name="'chevron-'+icon_img+'-outline'"></ion-icon></span>
                  </div>
                  <div class="iabi-images">
                      <div v-if='images.length==0'>This conversation hasn't had any images yet.</div>
                      <img @click='reviewImage(img)' v-for='(img,index) in images' :key='"imagemsg"+index' :src="img" alt="Message image">
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
    props:{
        messages:Array,
        contact:Object,
        load:Boolean
    },
    data() {
        return {
            themes:[
                {name:"Rose",bgColor:'rgb(218, 155, 155)',color:"white"},
                {name:"Aqua",bgColor:'cadetblue',color:'white'},
                {name:"Lava",bgColor:'rgb(240, 193, 166)',color:'black'},
                {name:"Sand",bgColor:'rgb(139, 135, 127)',color:'black'},
            ],
            images:[

            ],
            themeShow:false,
            icon_th:'down',
            imageShow:false,
            icon_img:'down'
        }
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
    
    watch: {
        messages() {
            this.images=[]
            this.messages.forEach(m => {
                if (m.images) {
                    this.images=[...this.images,...m.images]
                }
            });
        }
    },
    
    methods: {
        closeInfo() {
            /* close info in mobie only */
            if (this.$route.name=="message_m-detail") {
                document.querySelector('#app > div.dash-board > div.message-body > div.chat-area.chatarea-mb').classList.remove('mobile-close')
                document.querySelector('#app > div.dash-board > div.message-body > div.information-area.infoarea-mb').classList.remove('mobile-show')
            }
        },
        reviewImage(img) {
            let imageReviewModal=document.querySelector('#app div.image-review-modal')
            let image=document.querySelector('#app div.image-review-modal div.irm-image img')
            imageReviewModal.classList.add('show')
            image.src=img
        },
        showImageSent() {
            document.querySelector('.information-area .ia-inner .ia-body .iab-item .iabi-images').classList.toggle('show')
            this.imageShow=!this.imageShow
            if (this.imageShow) {
                this.icon_img='up'
            }
            else if (!this.imageShow) {
                this.icon_img='down'
            }
        },
        showTheme() {
            document.querySelector('.information-area .ia-inner .ia-body .iab-theme').classList.toggle('show')
            this.themeShow=!this.themeShow
            if (this.themeShow) {
                this.icon_th='up'
            }
            else if (!this.themeShow) {
                this.icon_th='down'
            }
        },
        changeTheme(theme) {
            this.$store.state.messagetheme=theme
            db.ref("messagesData").child(this.$route.params.id).child('theme').set(theme)
        }
    },
    
}
</script>

<style>
.information-area {
    height: 100%;
    max-width: 30%;
    width: 30%;
    transition:.2s linear;
    position: relative;
}
.information-area.mobile-show {
    opacity: 1;
    display: block;
}
.information-area .ia-inner .ia-header {
    padding:15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;     
    border-bottom: 1px solid silver;
}
.information-area .ia-inner .ia-header .iah-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
}
.information-area .ia-inner .ia-header .iah-lastlogin span.online {
    background-color:green;
}
.information-area .ia-inner .ia-header .iah-lastlogin span.offline {
    background-color:slategray;
}
.information-area .ia-inner .ia-body .iab-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition:.15s linear;
    position: relative;
}
.information-area .ia-inner .ia-body .iab-theme {
    height: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    transition:.3s linear;
    overflow: hidden;
    align-items: center;
}
.information-area .ia-inner .ia-body .iab-theme.show {
    height: 100px;
}
.information-area .ia-inner .ia-body .iab-theme .iabt-item {
    width: 80px;
    height: 30px;
    padding:5px;
    border:1px solid;
    border-radius: 50px;
    background:white;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    cursor: pointer;
    transition:.2s linear;
}
.information-area .ia-inner .ia-body .iab-theme .iabt-item.selected {
    transform: scale(1.05);
    font-weight: bold;
    border-width: 3px;
}
.information-area .ia-inner .ia-body .iab-theme .iabt-item:hover {
    transform: scale(1.05);
}
.information-area .ia-inner .ia-body .iab-item .iabi-title {
    padding:10px 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    transition:.15s linear;
    width: 100%;
}
.information-area .ia-inner .ia-body .iab-item .iabi-title:hover {
    background-color:whitesmoke;
}
.information-area .ia-inner .ia-body .iab-item .iabi-images {
    position: absolute;
    top:100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow-y:auto;
    max-height:0;
    transition:.3s linear;
}
.information-area .ia-inner .ia-body .iab-item .iabi-images.show {
    max-height: 500px;
}
.information-area .ia-inner .ia-body .iab-item .iabi-images img {
    height: 100px;
    margin:5px 0;
    cursor:pointer;
}
.information-area .ia-inner .ia-body .iab-item .iabi-images img:hover {
    border:1px solid orange;
}
/*  */
@media only screen and (max-width: 768px) {
    .information-area {
        height: 100%;
        max-width: 100%;
        width: 100%;
    }
}
/*  */
</style>