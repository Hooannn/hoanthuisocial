<template>
  <div class="error-page">
    <div>
      <span style='padding:10px;fontSize:18px;fontWeight:bold;borderBottom:2px solid gainsboro'>Something went wrong...</span>
      <div style='padding:20px'>Please go back. :(</div>
      <button @click='$router.go(-1)' style='position:absolute;bottom:5px;right:5px;color:whitesmoke' class="btn btn-link">Go back</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background-color:rgba(0,0,0,0.7);
  position: fixed;
  top:0;
  left:0;
}
.error-page>div {
  border-radius: 3px;
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color:#313131;
  color:whitesmoke;
}
</style>
