<template>
  <div class="loading-page">
    <div class="loader"></div>
  </div>
</template>

<script>
import store from "./../store/store";
export default {
  beforeRouteEnter(to, from, next) {
    if (store.state.user != null) {
      next();
    } else next(false);
  },
};
</script>

<style>
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.loading-page .loader {
  width: 6vw;
  height: 6vw;
  border: 1vw solid #f3f3f3;
  border-radius: 50%;
  border-top: 1vw solid orange;
  animation: spin 0.7s infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
