<template>
  <div class="coming-call-modal">
      <div class="ccm-inner">
          <div class="ccmi-shadow"></div>
          <div @click='close' class='ccmi-close center'><ion-icon name="close-circle-outline"></ion-icon></div>
          <img v-if='$store.state.callComing.call' class='ccmi-image' :src="$store.state.callComing.call.image" alt="Avatar img">
          <div v-if='$store.state.callComing.call' class="ccmi-content">
              {{$store.state.callComing.call.name}} is calling you...
          </div>
          <div style='display:flex;fontSize:5px;' class="ccmi-load">
              <div style='margin:0 2px' v-for='i in 3' :key='"ccmiload"+i'>
                  <i class="fas fa-circle"></i>
              </div>
          </div>
          <div class="ccmi-control">
              <button @click='acceptCall' class="btn btn-sm btn-success"><i class="fas fa-phone"></i></button>
              <button @click='close' class="btn btn-sm btn-danger"><i style='transform:rotate(-135deg)' class="fas fa-phone"></i></button>
          </div>
          <audio :key='$store.state.callComing.call.key' v-if='$store.state.callComing.call' autoplay loop>
              <source :src="callS" type="audio/mpeg">
          </audio>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import callSound from '@/assets/sounds/call.mp3'
export default {
    data() {
        return {
            callS:callSound
        }
    },
    methods:{
        close() {
            document.querySelector('#app div.coming-call-modal').classList.remove('show')
            db.ref('call').child(this.$store.state.callComing[".key"]).remove().then(()=>{
                db.ref('usersInformation').child(this.$store.state.ukey).child('call').set('free')
                this.$store.state.callComing={}
            }).catch(err=>{
                console.log(err)
            })
        },
        acceptCall() {
            document.querySelector('#app div.coming-call-modal').classList.remove('show')
            db.ref('call').child(this.$store.state.callComing[".key"]).remove().then(()=>{
                this.$store.state.callComing={}
            }).catch(err=>{
                console.log(err)
            })
            this.$router.push({name:"video-call",query:{type:'answer'},params:{id:this.$store.state.callComing.peerid}})
        }
    }
}
</script>

<style>
.coming-call-modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color:rgba(0,0,0,0.5);
    z-index:200;
    top:0;
    left:0;
    align-items: center;
    justify-content: center;
    display: none;
}
.coming-call-modal.show {
    display: flex;
}
.coming-call-modal .ccm-inner {
    width: 330px;
    height: 450px;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    background-color:#313131;
    border-radius: 10px;
    animation:slide-up_1 .2s linear; 
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color:white;
}
.coming-call-modal .ccm-inner .ccmi-close {
    position:absolute;
    right:5px;
    top:5px;
    font-size: 25px;
    color:grey;
    transition:.2s linear;
    cursor: pointer;
}
.coming-call-modal .ccm-inner .ccmi-close:hover {
    transform: rotate(90deg) scale(1.1);
    color:orangered;
}
.coming-call-modal .ccm-inner .ccmi-shadow {
    border-radius: 10px;
    position: absolute;
    width: 102%;
    height: 102%;
    border:3px solid rgb(255, 165, 0);
    animation: zoom-fade 1s linear infinite;
    pointer-events: none;
}

.coming-call-modal .ccm-inner .ccmi-load div{
    animation: phoneload 1.3s ease-in-out infinite;
}
.coming-call-modal .ccm-inner .ccmi-image {
    width: 200px;
    height: 200px;
    border:7px solid rgb(192, 192, 192,0.1);
    box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    border-radius: 15px;
}
.coming-call-modal .ccm-inner .ccmi-control button {
    margin:10px;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    font-size: 20px;
}
.coming-call-modal .ccm-inner .ccmi-control,
.coming-call-modal .ccm-inner .ccmi-content,
.coming-call-modal .ccm-inner .ccmi-image {
    margin:20px 0;
}
/* animation */
@keyframes slide-up_1 {
    0% {
        transform:translateY(300%);
    }
    100% {
        transform:translateY(0);
    }
}
@keyframes zoom-fade {
    0% {
        transform: scale(1);
        opacity: 0.5;
    }
    100% {
        transform: scale(1.08);
        opacity: 0;
    }
}
@keyframes phoneload {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: none;
  }
}
</style>