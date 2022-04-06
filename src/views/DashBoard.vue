<template>
  <div @click="closeMoreInfo" class="dash-board">
    <dashboard-nav />
    <router-view></router-view>
  </div>
</template>

<script>
import DashboardNav from "../components/DashBoard/DashboardNav.vue";
import store from "./../store/store";
export default {
  components: { DashboardNav },
  methods: {
      closeMoreInfo(e) {
          this.$store.dispatch('closeMoreInfo',e)
      }
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.user != null) {
      next();
    } else next(false);
  },
};
</script>

<style>
.dash-board {
  width: 100%;
  min-height: 100%;
  height: auto;
  position: relative;
}
</style>
