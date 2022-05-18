<template>
  <div @click='close_' class="calling-modal center">
      <div class="cm-main">
          <video class='video1' autoplay playsinline ></video>
          <video class='video2' autoplay playsinline ></video>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        close_(e) {
            if (e.target==document.querySelector('#app > div.dash-board > div.calling-modal.center')) {
                document.querySelector('#app > div.dash-board > div.calling-modal.center').classList.remove('show')
            }
        }
    }
}
</script>

<style>
.calling-modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color:rgba(0,0,0,0.7);
    top:0;
    left:0;
    z-index: 1999;
    visibility: hidden;
    opacity: 0;
}
.calling-modal.show {
    visibility: visible;
    opacity: 1;
}
.calling-modal .cm-main {
    width: 1000px;
    height: 600px;
    background-color:white;
    box-shadow: 0 0 3px rgba(0,0,0,0.3);
    display: flex;
}
.calling-modal .cm-main .video1,.calling-modal .cm-main .video2 {
    width: 50%;
    height:65%;
}
</style>