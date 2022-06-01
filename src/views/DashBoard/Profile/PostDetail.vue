<template>
  <div style='margin:25px auto;' class="post-detail">
      <post-com v-if='post!=""' :key='post.key' :class='post.key' :postKey='post.key' :authorKey='post.author' :postImages="post.images"/>
      <div v-if='post==""'>This post has been deleted.</div>
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
      }
  },
  watch: {
      postsData() {
        this.post=''
        this.postsData.forEach(data => {
          if (data.author==this.$route.params.key && data.key==this.$route.params.postKey) {
            this.post=data
          }
        });
      }
  },
  mounted() {
      this.$rtdbBind('postsData',db.ref('postsData'))
  }
}
</script>

<style>
.post-detail {
  width: 50%;
}
/*  */
@media only screen and (max-width: 768px) {
  .post-detail {
    width: 95%;
  }
}
</style>