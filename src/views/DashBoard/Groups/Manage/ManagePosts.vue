<template>
  <div class="manage-posts">
      <post-com v-for='post in posts' :class='post[".key"]' :key='post[".key"]' :authorKey="post.author" :postKey='post[".key"]' :postImages="post.images"/>
  </div>
</template>

<script>
import PostCom from '@/components/Post/PostCom.vue'
import db from '../../../../plugins/firebase'
export default {
  components: { PostCom },
    data() {
        return {
            postsData:[],
            posts:[],
        }
    },
    watch:{
        postsData() {
            this.posts=[]
            this.postsData.forEach(post => {
                if (post.type='group-post'&&post.groupKey==this.$route.params.key) {
                    this.posts.unshift(post)
                    console.log(post)
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