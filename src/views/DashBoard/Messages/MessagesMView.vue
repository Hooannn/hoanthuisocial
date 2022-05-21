<template>
  <div class="messages-m-view">
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