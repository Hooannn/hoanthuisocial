<template>
  <div class="messages-m-view">
      <div class="mmv-notice-modal center">
        <div class="mmvn-modal-inner">
          It seem that you're using laptop or computer. Please go to messages view for computer.<br>
          <button @click='$router.push({name:"messages"})' class="btn btn-sm btn-link">Go.</button>
        </div>
      </div>
    <side-bar/>
  </div>
</template>

<script>
import SideBar from '@/components/Messages/PC/SideBar.vue'
export default {
  components: { SideBar },

}
</script>

<style>
.messages-m-view {
    width: 100vw;
    height: 100vh;
}

</style>