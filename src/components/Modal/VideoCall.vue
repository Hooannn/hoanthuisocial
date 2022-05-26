<template>
  <div class="video-call">
    <div class="vc-endcall-modal">
        <div class="vcem-inner">
            <div>The call has been ended.</div>
            <button @click='goBack' style='width:90px;alignSelf:end' class="btn btn-sm btn-dark">Go back</button>
        </div>
    </div>
    <div class="vc-top-bar">
        <div class="container">
            <div class="vctb-info">
                <img :src='$route.query.i||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"' alt="Avatar image">
                <div>
                    <div >{{$route.query.n||"User"}}</div>
                    <div style='fontSize:15px;color:silver'>{{getTime}}</div>
                </div>
            </div>
            <div class='vctb-control center'>
                <button class="btn btn-sm btn-light center"><i class="fas fa-cog"></i></button>
            </div>
        </div>
    </div>
    <div class="vc-body">
        <div style='height:100%;position:relative;flexDirection:column' class="container center">
            <video v-show='$store.state.getContactVideo' id='contactVideo' autoplay></video>
            <img style='width:320px;height:320px;borderRadius:50%' v-show='!$store.state.getContactVideo' :src="$route.query.i||'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'" alt="Contact avatar">
            <div v-if='!$store.state.getContactVideo'>Waiting...</div>
            <div :class='{hide:hide}' class="vcb-m-video center">
                <div :class='{show:hide}' class="vcbv-control">
                    <button @click='hide=!hide' class="center btn btn-sm btn-light"><i :class='{"fa-compress-alt":!hide,"fa-compress":hide}' class="fas"></i></button>
                    <button @click='myMuted=!myMuted,muteMyMic()' :class='{"btn-info":myMuted,"btn-light":!myMuted}' class="center btn btn-sm"><i :class='{"fa-microphone":myMuted,"fa-microphone-slash":!myMuted}' class="fas"></i></button>
                    <button @click='myCamera=!myCamera,hideMyCamera()' :class='{"btn-info":myCamera,"btn-light":!myCamera}' class="center btn btn-sm"><i :class='{"fa-video":myCamera,"fa-video-slash":!myCamera}' class="fas"></i></button>
                </div>
                <video v-show='$store.state.getMyVideo' autoplay id="myVideo"></video>
                <img style='width:150px;' v-show='!$store.state.getMyVideo' :src="$store.state.avatarImg" alt="My avatar">
            </div>
        </div>
    </div>
    <div class="vc-bottom-bar center">
        <button @click='endCall' class="btn btn-sm btn-danger center"><i style='transform:rotate(-135deg);' class="fas fa-phone"></i></button>
        <button @click='contactMuted=!contactMuted' :class='{"btn-dark":!contactMuted,"btn-success":contactMuted}' class="btn btn-sm center"><i :class="{fas:true,'fa-volume-mute':!contactMuted,'fa-volume-up':contactMuted}"></i></button>
    </div>
  </div>
</template>
<script>
// #myVideo => My video cam
// #contactVideo => Contact video cam
import db from '@/plugins/firebase'
import store from '@/store/store'
import router from '@/router/router'
export default {
    data() {
        return {
            timeInterval:null,
            time:0,
            contactMuted:true,
            myMuted:true,
            myCamera:true,
            hide:false,
            vpeer:null,
        }
    },
    computed:{
        getTime() {
            let sec_num = parseInt(this.time, 10)
            let hours   = Math.floor(sec_num / 3600)
            let minutes = Math.floor(sec_num / 60) % 60
            let seconds = sec_num % 60
            return [hours,minutes,seconds].map(v => v < 10 ? "0" + v : v).filter((v,i) => v !== "00" || i > 0).join(":")
        }
    },
    methods: {
        timeCount() {
            this.time++
        },
        endCall() {
            this.vpeer.destroy()
            this.$store.state.getMyVideo=false
            this.$store.state.getContactVideo=false
            if (this.$route.query.type=="call") {
                db.ref('call').child(this.$route.params.id).remove().then(()=>{
                    this.goBack()
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        goBack() {
            router.push({name:"dhome"})
            setTimeout(function(){
                location.reload()
            },10)
        },
        muteMyMic() {
            console.log("muted")
        },
        hideMyCamera() {
            console.log("hided")

        },
        createPeer(id) {
            let callid=this.$route.params.id
            // New peer init
            let peer=new Peer(null,{
                debug:2
            })
            this.vpeer=peer
            // peer start 
            peer.on('open',function(id) {
                db.ref('call').child(callid).child('peerid').set(id)
                console.log('Your peer Id:', id)
                // get my source stream
                navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((stream)=>{
                    store.state.getMyVideo=true
                    store.state.myVideo=stream.id
                    document.querySelector('#myVideo').srcObject=stream
                }).catch(err=>{
                    console.log("Can't not get your own source stream")
                    store.state.getMyVideo=false
                    console.log(err)
                })
                /*  */
            })
            // peer error
            peer.on('error', function(err) {
                console.log(err)
            })
            // connection start when contact connected
            peer.on('connection', function(conn) {
                console.log('Someone is connecting...')
                // handle connection lost
                conn.on('close',function() {
                    document.querySelector('#app > div.dash-board > div.video-call > div.vc-endcall-modal').classList.add('show')
                    console.log('Your connector left.')
                    document.querySelector('#contactVideo').srcObject=null
                })
            })
            // peer on call event 
            peer.on('call', (call) => {
                navigator.mediaDevices.getUserMedia({video: true, audio: true})
                    .then((stream) => {
                        // Answer the call from contact with the source stream
                        call.answer(stream);
                        // Receive source stream from contact throught "on stream event" 
                        call.on('stream', function(stream) {
                            if (stream) {
                                document.querySelector('#contactVideo').srcObject=stream
                                store.state.contactVideo=stream.id
                                store.state.getContactVideo=true
                            } 
                            else {
                                store.state.getContactVideo=false
                            }
                        });
                    })
                    .catch((err) => {
                        console.error('Failed to get local stream', err);
                    });
                });
            //function that cannot work in Vue methods
        },
        connectPeer(id) {
            let callid=this.$route.params.id
            // New peer init
            let peer=new Peer(null,{
                debug:2
            })
            this.vpeer=peer
            // peer start
            peer.on('open',function(id) {
                console.log('Your peer Id:', id)
                // connect to the caller
                let conn=peer.connect(callid)
                // connection start
                conn.on('open', function() {
                    // get my source stream
                    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream=>{
                        store.state.getMyVideo=true
                        store.state.myVideo=stream.id
                        document.querySelector('#myVideo').srcObject=stream
                    }).catch(err=>{
                        store.state.getMyVideo=false
                        console.log("Can't not get your own source stream")
                        console.log(err)
                    })
                })
                // handle connection lost
                conn.on('close',function() {
                    document.querySelector('#app > div.dash-board > div.video-call > div.vc-endcall-modal').classList.add('show')
                    console.log("Your connector left.")
                    document.querySelector('#contactVideo').srcObject=null
                })
                // connection error
                conn.on('error', function(err) {
                    console.log('can not connect',err)
                })
                // get my source stream
                navigator.mediaDevices.getUserMedia({video: true, audio: true})
                    .then((stream) => {
                        // then make a call by sending my source stream to the caller
                        let call = peer.call(callid, stream);
                        // receive source stream when the caller answer
                        call.on('stream', function(stream){
                            if (stream) {
                                store.state.contactVideo=stream.id
                                store.state.getContactVideo=true
                                document.querySelector('#contactVideo').srcObject=stream
                            }
                            else {
                                store.state.getContactVideo=false
                            }
                        });
                    })
                    .catch((err) => {
                        console.log('Failed to get local stream', err);
                    });
                
            })
            peer.on('error',function(err){
                console.log(err)
                document.querySelector('#app > div.dash-board > div.video-call > div.vc-endcall-modal').classList.add('show')
            })
        }
    },
    mounted() {
        if (this.$route.query.type=='call') {
            this.createPeer()
        }
        else if (this.$route.query.type=='answer') {
            this.connectPeer()
        }
        this.timeInterval=setInterval(this.timeCount,1000)
    },
    destroyed() {
        clearInterval(this.timeInterval)
    },
    beforeRouteLeave(to,from,next) {
        db.ref('usersInformation').child(store.state.ukey).child('call').set('free')
        next()
    }
}
</script>

<style>
.video-call {
    overflow:hidden;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    position: absolute;
    top:0;
    left:0;
    z-index:100;
    padding:70px 0;
}
/* endcall modal */
.video-call .vc-endcall-modal {
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color:rgb(145, 142, 138);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    display: none;
}
.video-call .vc-endcall-modal .vcem-inner{
    background-color:white;
    box-shadow: 0 0 3px rgba(0,0,0,1);
    animation: ec-slide-up .3s linear;
    padding:20px 30px;
    font-size: 20px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
}
.video-call .vc-endcall-modal .vcem-inner * {
    margin:10px 0;
}
.video-call .vc-endcall-modal.show {
    display: flex;
}
@keyframes ec-slide-up {
    0% {
        transform: translateY(200%);
    }
    100% {
        transform: translateY(0);
    }
}
/* top bar */
.video-call .vc-top-bar {
    height: 70px;
    width: 100%;
    background-color:#313131;
    position:absolute;
    top:0;
    left:0;
    color:white;
}
.video-call .vc-top-bar .container {
    display: flex;
    justify-content: space-between;
    height: 100%;
}
.video-call .vc-top-bar .vctb-info {
    display: flex;
    align-items: center;
}
.video-call .vc-top-bar .vctb-info img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 5px;
}
.video-call .vc-top-bar .vctb-control button{
    height: 35px;
    width: 35px;
    font-size: 20px;
}
/* body */
.video-call .vc-body {
    width: 100%;
    height: 100%;
    background-color:rgb(145, 142, 138);
}
.video-call .vc-body video {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.video-call .vc-body .vcb-m-video {
    position: absolute;
    background-color:rgb(219, 155, 155);
    border-radius: 15px;
    right:50px;
    bottom:50px;
    box-shadow: 0 0 3px rgba(0,0,0,0.4);
    transition:.3s linear;
    cursor: pointer;
    overflow: hidden;
    height: 200px;
}
.video-call .vc-body .vcb-m-video.hide {
    height: 50px;
    width: 150px;
}
.video-call .vc-body .vcb-m-video.hide video,.video-call .vc-body .vcb-m-video.hide img {
    visibility: hidden;
}
.video-call .vc-body .vcb-m-video video {
    height: 100%;
    object-fit: contain;
}
.video-call .vc-body .vcb-m-video .vcbv-control {
    position: absolute;
    z-index: 10;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    transform: translateY(200px);
    transition:.3s linear;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.video-call .vc-body .vcb-m-video .vcbv-control button {
    min-width: 40px;
    min-height: 40px;
    font-size: 16px;
    border-radius: 50%;
}
.video-call .vc-body .vcb-m-video:hover video{
    filter:blur(2px);
}
.video-call .vc-body .vcb-m-video:hover .vcbv-control {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
}
.video-call .vc-body .vcb-m-video .vcbv-control.show {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
}
/* bottom bar */
.video-call .vc-bottom-bar {
    height: 70px;
    width: 100%;
    background-color:#313131;
    position:absolute;
    bottom:0;
    left:0;
}
.video-call .vc-bottom-bar button {
    font-size: 30px;
    width: 55px;
    height: 55px;
    margin:0 10px;
}

/* responsive */
@media only screen and (max-width: 1024px) {
    .video-call {
        padding:50px 0;
    }
    .video-call .vc-bottom-bar,.video-call .vc-top-bar {
        height: 50px;
    }
    .video-call .vc-bottom-bar button {
        font-size: 15px;
        width: 30px;
        height: 30px;
    }
    .video-call .vc-top-bar .vctb-control button {
        font-size: 15px;
        width: 30px;
        height: 30px;
    }
    .video-call .vc-top-bar .vctb-info img{
        width: 35px;
        height: 35px;
    }
    .video-call .vc-body .vcb-m-video {
        height: 150px;
    }
}
@media only screen and (max-width: 576px) {
    .video-call .vc-top-bar .container {
        width: 90%;
    }
    .video-call .vc-body .vcb-m-video {
        height: 100px;
    }
}   
</style>