<template>
  <div class="video-call center">
        {{$route.params.id}}
  </div>
</template>
<script>
import '@/plugins/peer'
export default {
    data() {
        return {

        }
    },
    methods:{
        connectRoom() {
            
        }
    },
    /*
    mounted() {
        var peer = new Peer(this.$route.params.id);
        var conn = peer.connect(this.$store.state.ukey);
        peer.on('open', function(id) {
	        console.log('My peer ID is: ' + id);
        });
        peer.on('connection', function(conn) { 
            console.log('new connect', conn.id)
        });
    }
    */
}
</script>

<style>
.video-call {
    width: 100vw;
    min-height: 100vh;
}
</style>