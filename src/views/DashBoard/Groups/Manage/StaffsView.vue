<template>
  <div class="staffs-view">
      <div style='width:18%' class="first-col">
      <div class="manage">
        <h5>Manage</h5>
        <div
          v-for="(manage, index) in manages"
          :key="index"
          @click="$router.push({ name: manage.name })"
            :class='{selected:$route.name==manage.name}'
        >{{manage.title}}</div>
      </div>
    </div>
    <div style='width:78%' class="second-col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      manages: [
        { title: "Information", name: "group-manage-info" },
        { title: "Posts", name: "group-manage-post" },
        { title: "Members", name: "group-manage-members" },
        { title: "Join Requested", name: "group-manage-members-request" },
      ],
    };
  },
  mounted() {
    this.$router.push({name:'group-manage-info'})
  }
};
</script>

<style>
.staffs-view {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.staffs-view .first-col {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.staffs-view .second-col {
  height: 100%;
}
/* 1 col */
/* your details */
.manage {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 2px;
  text-overflow: ellipsis;
  background-color: white;
  width: 100%;
}
.manage h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
.manage div {
  padding: 15px 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
}
.manage div.selected, .manage div:hover {
  border-right:2px solid #ff7555;
  color:#ff7555;
}
/* 2 col */
</style>