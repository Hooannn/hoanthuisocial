<template>
  <div class="edit-view">
    <div class="first-col">
      <div class="your-details">
        <h5>Your Details</h5>
        <div
          v-for="(detail, index) in yourDetails"
          :key="index"
          @click="$router.push({ name: detail.name }),selected=detail.title"
            :class='{selected:selected==detail.title}'
        >{{detail.title}}</div>
      </div>
    </div>
    <div class="second-col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from '../../../../store/store'
import router from '../../../../router/router'
export default {
  data() {
    return {
      yourDetails: [
        { title: "Personal Info", name: "personal" },
        { title: "Profile", name: "profile-edit" },
        { title: "Social Networks", name: "social-networks" },
        { title: "Email Setting", name: "email-setting"},
        { title: "Change Password", name: "change-password" },
        { title: "Deactivate Account", name: "deactivate-account" },
      ],
      selected:'',
    };
  }
};
</script>

<style>
.edit-view {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.edit-view .first-col {
  width: 18%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.edit-view .second-col {
  width: 78%;
  height: 100%;
}
/* 1 col */
/* your details */
.your-details {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 2px;
  text-overflow: ellipsis;
  background-color: white;
}
.your-details h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
.your-details div {
  padding: 15px 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
}
.your-details div.selected, .your-details div:hover {
  border-right:2px solid #ff7555;
  color:#ff7555;
}
/* 2 col */
</style>
