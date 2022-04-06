<template>
  <div class="deactivate-account">
      <h5>Deactivate Account</h5>
      <div style='padding:30px'>
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Email</div>
          <input style='padding:5px;width:300px' type="text" placeholder="Enter Email Address">
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Password</div>
          <input style='padding:5px;width:300px' type="text" placeholder="Enter Password">
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Description Here</div>
          <textarea style='padding:5px;width:100%;min-height:100px;' placeholder="Description"/>
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
.deactivate-account {
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
.deactivate-account h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
</style>