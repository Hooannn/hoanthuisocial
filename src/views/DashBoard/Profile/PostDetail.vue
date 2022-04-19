<template>
  <div style='width:90%;margin:25px auto;' class="post-detail">
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
          data:[],
          posts:[],
          post:'',
      }
  },
  watch: {
      data() {
        this.posts=[]
        this.data.forEach(data => {
          if (data.posts) {
              this.posts.push(data.posts)
          }
        });
        this.post=this.posts.find(post => post[this.$route.params.postKey])[this.$route.params.postKey]
      }
  },
  mounted() {
      this.$rtdbBind('data',db.ref('usersInformation'))
  }
}
</script>

<style>

</style>