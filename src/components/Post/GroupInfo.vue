<template>
  <div style='padding:5px;display:flex;backgroundColor:rgba(0,0,0,0.06)' class="group-info">
      <button @click='viewGroup' style='display:flex;color:orangered' class="btn-sm btn-link btn">
          <div style='width:20px;height:20px;borderRadius:50%;overflow:hidden'><img style='width:100%;height:100%;objectFit:cover' :src="group.avatarImg" alt="Group Avatar Img"></div>
          <div style='marginLeft:5px'>Post from <strong>{{group.groupname}}</strong></div>
      </button>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props: {
        groupKey:String
    },
    data() {
        return {
            group:{}
        }
    },
    methods: {
        viewGroup() {
            this.$router.push({name:'group-post',params:{key:this.groupKey}})
        }
    },
    mounted() {
        this.$rtdbBind('group',db.ref('groups').child(this.groupKey))
    }
}
</script>

<style>

</style>