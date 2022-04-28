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
      <b-toast id="send-group-request" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:orange;color:green;fontSize:16px'><ion-icon style='marginRight:5px' name="enter-outline"></ion-icon> Group</div>
            <div style='backgroundColor:whitesmoke;color:black'>You has sent request to join this group.</div> 
        </div>
      </b-toast>
      <b-toast id="edit" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:rgba(0, 128, 0, 0.795);color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="create-outline"></ion-icon> Success</div>
            <div style='backgroundColor:whitesmoke;color:black'>Edit successfully.</div> 
        </div>
      </b-toast>
      <b-toast id="new-message" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:#FB5252;color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="chatbox-ellipses-outline"></ion-icon> Message</div>
            <div style='backgroundColor:whitesmoke;color:black'>You have new message.</div> 
        </div>
      </b-toast>
      <b-toast id="alert-empty-blog" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:orangered;color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="alert-outline"></ion-icon> Alert</div>
            <div style='backgroundColor:whitesmoke;color:black'>We don't find any content you have post. Try again.</div> 
        </div>
      </b-toast>
      <b-toast id="alert-no-change" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:orangered;color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="alert-outline"></ion-icon> Alert</div>
            <div style='backgroundColor:whitesmoke;color:black'>You haven't change anything or some information is missing.</div> 
        </div>
      </b-toast>
      <b-toast id="report" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:rgba(0, 128, 0, 0.795);color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="create-outline"></ion-icon> Success</div>
            <div style='backgroundColor:whitesmoke;color:black'>Your report has been sent. Thanks you.</div> 
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