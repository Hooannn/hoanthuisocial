<template>
  <div :class='{selected:(yourContact&&$route.params.id==contact[".key"])}' class="contact-user" @click='viewMessage'>
    <div v-if='!yourContact' class='center cu-load'></div>
    <div v-if='unseenMessage>0' class="cu-unseenmsg center">
        {{unseenMessage}}
    </div>
    <div v-if='yourContact' class="cu-avatar">
        <img :src="yourContact.avatarImg" alt="Avatar image">
        <div :class='{online:yourContact.status=="Online",offline:yourContact.status=="Offline"}' class="cu-status"></div>
    </div>
    <div v-if='yourContact' class="cu-detail">
        <div class="cud-username">{{yourContact.username}}</div>
        <div class="cud-lastlogin">Online <span v-if='yourContact.status=="Offline"'>{{getTime.toLowerCase()}}</span></div>
    </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
    props:{
        contact:Object,
    },
    data() {
        return {
            yourContact:null,
            unseenMessage:0,
            messages:[],
        }
    },
    watch: {
        messages() {
            this.unseenMessage=0
            this.messages.forEach(message => {
                if (message.author!=this.$store.state.ukey && message.status=='Unseen') {
                    this.unseenMessage++
                }
            })
        },
    },
    computed: {
        getTime() {
            let time=(new Date().getTime()-(this.yourContact['Last Login']))/1000
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
    methods:{
        viewMessage() {
            if (this.$route.name=="messages"||this.$route.name=="message-detail") {
                this.$router.push({name:"message-detail",params:{id:this.contact[".key"]}})
            }
            else if (this.$route.name=="messages_m") {
                this.$router.push({name:"message_m-detail",params:{id:this.contact[".key"]}})
            }
        }
    },
    mounted() {
        if (this.contact.user1==this.$store.state.ukey) {
            this.$rtdbBind('yourContact',db.ref('usersInformation').child(this.contact.user2))
        }
        if (this.contact.user2==this.$store.state.ukey) {
            this.$rtdbBind('yourContact',db.ref('usersInformation').child(this.contact.user1))
        }
        this.$rtdbBind('messages',db.ref('messagesData').child(this.contact[".key"]).child('data'))
    }
}
</script>

<style>
.contact-user.selected {
    background-color:rgb(162, 177, 190);
}
.contact-user {
    display: flex;
    padding:20px 10px;
    cursor: pointer;
    transition:.1s linear;
    position: relative;
}
.contact-user.selected:hover {
    background-color:rgb(162, 177, 190);
}
.contact-user:hover {
    background-color:rgba(255,255,255,0.6);
}
.contact-user .cu-load {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border:5px solid white;
    border-top-color: orange;
    animation: spin .3s linear infinite;
}
.contact-user .cu-unseenmsg {
    position: absolute;
    right:5px;
    width: 18px;
    height: 18px;
    background-color:orangered;
    color:white;
    font-size: 13px;
    border-radius: 3px;
    font-weight: bold;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}
.contact-user .cu-avatar img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
}
.contact-user .cu-status {
    position:absolute;
    bottom:0;
    right:0;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background-color:black;
}
.contact-user .cu-status.online {
    background-color:green;
}
.contact-user .cu-status.offline {
    background-color:gray;
}
.contact-user .cu-avatar {
    position: relative;
    max-width: 55px;
    max-height: 55px;
}
.contact-user .cu-detail {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.contact-user .cu-detail .cud-username {
    font-weight: bold;
}
.contact-user .cu-detail .cud-lastlogin {
    font-size: 14.5px;

}
/*  */
@media only screen and (max-width: 1200px) {
  .contact-user .cu-avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .contact-user .cu-avatar {
    position: relative;
    max-width: 50px;
    max-height: 50px;
  }
}
@media only screen and (max-width: 920px) {
  .contact-user .cu-avatar img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .contact-user .cu-avatar {
    position: relative;
    max-width: 45px;
    max-height: 45px;
  }
}
/*  */
</style>