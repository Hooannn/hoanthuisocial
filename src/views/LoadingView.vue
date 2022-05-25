<template>
  <div class="loading-page">
    <div class='loader-cover' style='width:50px;height:50px;borderRadius:50%;display:flex;justifyContent:center;alignItems:center;backgroundColor:#313131'>
      <div class="loader"></div>
    </div>
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
  min-width: 100vw;
  min-height: 100vh;
  position:fixed;
  top:0;
  left:0;
  z-index: 99999;
  cursor:wait;
  display: flex;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
}
.loading-page.show {
  visibility: visible;
  opacity: 1;
}
.loading-page .loader-cover {
  margin-top:165px;
}
.loading-page .loader {
  width: 35px;
  height: 35px;
  border: 3px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  border-top: 3px solid orange;
  animation: spin3 0.7s infinite;
}
@keyframes spin3 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
