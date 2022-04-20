<template>
  <div class="manage-notifications">
      <h5 style='backgroundColor:white'>Notifications</h5>
      <noti-com :type='"group"' :groupKey='$route.params.key' v-for='noti in notifications' :key='noti[".key"]' :notiKey="noti['.key']"/>
  </div>
</template>

<script>
import NotiCom from '../../../../components/General/NotiCom.vue'
import db from '../../../../plugins/firebase'
export default {
  components: { NotiCom },
    data() {
        return {
            notifications:[]
        }
    },
    mounted() {
        this.$rtdbBind('notifications',db.ref('groups').child(this.$route.params.key).child('notifications').orderByChild('time'))
    }
}
</script>

<style>
.manage-notifications {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  text-overflow: ellipsis;
  background-color: rgb(243, 234, 224);
  width: 100%;
  justify-content: center;
  position: relative;
}
</style>