<template>
  <div class="video-call center">
        <div class='vc-control center'>
            <div>Status: <span id='result'>None</span></div>
            <div >My Peer: <span id='myPeer'>None</span></div>
            <button @click='createPeer' id='btn-create' class="btn btn-sm btn-info">Create Peer</button>
            <input v-model='peerId' id='peerId' type="text" placeholder="Room">
            <div style='fontWeight:bolder;color:red;fontSize:14px;marginTop:-3px'>{{err}}</div>
            <div>Your connect peer: <span id='connectPeer'>None</span></div>
            <button @click='connectPeer' id='btn-connect' class="btn btn-sm btn-info">Connected</button>
        </div>
        <div class="vc-videos center">
            <div class="vcv-video center">
                <video id='myVideo' autoplay></video>
            </div>
            <div class="vcv-video center">
                <video id='contactVideo' autoplay></video>
            </div>
        </div>
  </div>
</template>
<script>
import db from '@/plugins/firebase'
import store from '@/store/store'
export default {
    data() {
        return {
            peerId:'',
            err:'',
        }
    },
    watch: {
        peerId(e) {
            if (e.trim()!=''&&e!=null) {
                this.err=''
            }
        }
    },
    methods: {
        createPeer(id) {
            let callid=this.$route.params.id
            let peer=new Peer(null,{
                debug:2
            })
            peer.on('open',function(id) {
                db.ref('call').child(callid).child('peerid').set(id)
                console.log('Your peer Id:', id)
                document.querySelector('#btn-create').disabled=true
                document.querySelector('#btn-connect').disabled=true
                document.querySelector('#myPeer').innerHTML=id
                document.querySelector('#myPeer').innerHTML=id
                document.querySelector('#result').innerHTML="Host"
                /* get my video */
                navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((stream)=>{
                    document.querySelector('#myVideo').srcObject=stream
                }).catch(err=>{
                    console.log("Can't not get your own source stream")
                    console.log(err)
                })
                /*  */
            })
            
            peer.on('err', function(err) {
                console.log(err)
                document.querySelector('#result').innerHTML=err
            })
            peer.on('connection', function(conn) {
                console.log('Someone is connecting...')
                document.querySelector('#connectPeer').innerHTML='Someone is connecting...'
                conn.on('data',function(msg) {
                    document.querySelector('#connectPeer').innerHTML=msg
                })
                conn.on('close',function() {
                    console.log('Your connector left.')
                    document.querySelector('#contactVideo').srcObject=null
                })
            })
            peer.on('call', (call) => {
                navigator.mediaDevices.getUserMedia({video: true, audio: true})
                    .then((stream) => {
                        call.answer(stream); // Answer the call with an A/V stream.
                        call.on('stream', function(stream) {
                            document.querySelector('#contactVideo').srcObject=stream
                        });
                    })
                    .catch((err) => {
                        console.error('Failed to get local stream', err);
                    });
                });
        },
        connectPeer(id) {
            let callid=this.$route.params.id
            /*
            if (this.peerId.trim()==''||this.peerId==null) {
                this.err='Your room id is empty'
                return
            }
            */
            document.querySelector('#connectPeer').innerHTML=`Connecting to ${document.querySelector('#peerId').value}`
            let peer=new Peer(null,{
                debug:2
            })
            peer.on('open',function(id) {
                console.log('Your peer Id:', id)
                document.querySelector('#myPeer').innerHTML=id
                let key=document.querySelector('#peerId').value
                let conn=peer.connect(callid)
                conn.on('open', function() {
                    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream=>{
                        document.querySelector('#myVideo').srcObject=stream
                    }).catch(err=>{
                        console.log("Can't not get your own source stream")
                        console.log(err)
                    })
                    document.querySelector('#connectPeer').innerHTML=callid
                    document.querySelector('#result').innerHTML="Connected"
                    document.querySelector('#btn-create').disabled=true
                    document.querySelector('#btn-connect').disabled=true
                    conn.send(id)
                })
                conn.on('close',function() {
                    console.log("Your connector left.")
                    document.querySelector('#contactVideo').srcObject=null
                })
                conn.on('err', function(err) {
                    document.querySelector('#result').innerHTML=err
                    console.log(err)
                })
                navigator.mediaDevices.getUserMedia({video: true, audio: true})
                    .then((stream) => {
                        let call = peer.call(callid, stream);
                        call.on('stream', function(stream){
                            document.querySelector('#contactVideo').srcObject=stream
                        });
                    })
                    .catch((err) => {
                        logMessage('Failed to get local stream', err);
                    });
                
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
    },
    beforeRouteLeave(to,from,next) {
        db.ref('usersInformation').child(store.state.ukey).child('call').set('free')
        next()
    }
}
</script>

<style>
.video-call {
    user-select: text;
    width: 100vw;
    min-height: 100vh;
}
.video-call .vc-control {
    width: 50%;
    height: 100%;
    flex-direction: column;
}
.video-call .vc-control * {
    margin:5px 0;
}
.video-call .vc-videos {
    flex-direction: column;
    width: 50%;
    height: 100%;
}
.video-call .vc-videos .vcv-video {
    height: 300px;
    width: 500px;
    margin:10px;
    border:3px solid orange;
}
.video-call .vc-videos .vcv-video video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>