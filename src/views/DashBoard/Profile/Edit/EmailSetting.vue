<template>
  <div class="email-setting">
      <h5>Email Setting</h5>
      <div style='padding:30px'>
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Old Email Address</div>
          <input style='padding:5px;width:300px' type="text" placeholder="Enter Old Email Address">
          <div style='padding:5px;fontSize:15px;fontWeight:700'>New Email Address</div>
          <input style='padding:5px;width:300px' type="text" placeholder="Enter New Email Address">
      </div>
      <button style='width:50px;color:white;fontWeight:800;marginLeft:30px;marginBottom:30px' @click='saveChanges' class="btn btn-danger btn-sm">Save</button>
  </div>
</template>

<script>
export default {
    methods: {
        saveChanges() {
            alert("Sorry! This feature hasn't been updated")
        }
    }
}
</script>

<style>
.email-setting {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color: white;
}
.email-setting h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
</style>