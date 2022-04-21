<template>
  <div style='width:90%;margin:25px auto;' class="group-post-detail">
      <post-com :key='post.key' :class='post.key' :postKey='post.key' :authorKey='post.author' :postImages="post.images"/>
  </div>
</template>

<script>
import db from '../../../plugins/firebase'
import PostCom from '../../../components/Post/PostCom.vue'
export default {
  components: { PostCom },
  data() {
      return {
          postsData:[],
          post:'',
          members:[],
      }
  },
  watch: {
      postsData() {
        this.post=''
        this.postsData.forEach(data => {
          if (data.key==this.$route.params.postKey && data.groupKey==this.$route.params.key) {
            this.post=data
          }
        });
      }
  },
  mounted() {
      this.$rtdbBind('members', db.ref('groups').child(this.$route.params.key).child('members')).then(()=> {
          if (this.members.find(user=>user.key==this.$store.state.ukey)) {
            this.$rtdbBind('postsData',db.ref('postsData'))
          }
          else {
            this.$router.push({name:'group'})
          }
      })
  }
}
</script>

<style>

</style>