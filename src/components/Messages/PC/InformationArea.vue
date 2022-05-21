<template>
  <div class="information-area">
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
              <div class='iab-item'><span>Customize</span><span><ion-icon name="chevron-down-outline"></ion-icon></span></div>
              <div class='iab-item'><span>File, images</span><span><ion-icon name="chevron-down-outline"></ion-icon></span></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        messages:Array,
        contact:Object,
        load:Boolean
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
    methods: {
        closeInfo() {
            /* close info in mobie only */
            if (this.$route.name=="message_m-detail") {
                document.querySelector('#app > div.dash-board > div.message-body > div.chat-area.chatarea-mb').classList.remove('mobile-close')
                document.querySelector('#app > div.dash-board > div.message-body > div.information-area.infoarea-mb').classList.remove('mobile-show')
            }
        }
    }
}
</script>

<style>
.information-area {
    height: 100%;
    max-width: 30%;
    width: 30%;
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
    padding:10px 0;
    cursor: pointer;
    transition:.15s linear;
}
.information-area .ia-inner .ia-body .iab-item:hover {
    background-color: whitesmoke;
}
.information-area .ia-inner .ia-body .iab-item span {
    padding:0 15px;
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