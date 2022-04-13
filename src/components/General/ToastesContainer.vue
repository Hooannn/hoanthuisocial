<template>
  <div class='toastes-container' style='position:fixed;bottom:40px;right:40px;zIndex:1100;pointerEvents:none'>
      <b-toast id="new-blog" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:rgba(0, 128, 0, 0.795);color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="newspaper-outline"></ion-icon> Success</div>
            <div style='backgroundColor:whitesmoke;color:black'>You have successfully post a new post.</div> 
        </div>
      </b-toast>
      <b-toast id="unseen-notifications" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:orange;color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="notifications-outline"></ion-icon> Notice</div>
            <div class='content' style='backgroundColor:whitesmoke;color:black'>You have {{this.$store.state.unseenNoti}} unseen notifications.</div> 
        </div>
      </b-toast>
      <b-toast id="new-notifications" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:orange;color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="notifications-outline"></ion-icon> Notice</div>
            <div style='backgroundColor:whitesmoke;color:black'>You have new notification.</div> 
        </div>
      </b-toast>
      <b-toast id="edit" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:rgb(255, 117, 85);color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="create-outline"></ion-icon> Success</div>
            <div style='backgroundColor:whitesmoke;color:black'>Edit successfully.</div> 
        </div>
      </b-toast>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.toastes-container > * > div div{
    padding:10px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin:0;
}
</style>