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

</style>