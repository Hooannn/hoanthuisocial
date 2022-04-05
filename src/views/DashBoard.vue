<template>
  <div @click="closeMoreInfo" class="dash-board">
    <dashboard-nav />
        <router-view></router-view>
    <footer-com />
  </div>
</template>

<script>
import DashboardNav from "../components/DashBoard/DashboardNav.vue";
import FooterCom from "./../components/General/FooterCom.vue";
import store from "./../store/store";
export default {
  components: { DashboardNav, FooterCom },
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
  height: 100%;
}
</style>
