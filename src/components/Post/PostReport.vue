<template>
  <div @click='close' class="cover">
      <div class="post-report">
          <h5 style='padding:8px;color:orangered'>Report</h5>
          <div>Email:</div>
          <input disabled v-model="$store.state.user.email" style='padding:5px;' type="text" placeholder="Enter your email...">
          <div>Description:</div>
          <textarea v-model='description' style='padding:5px;' placeholder="Enter description..."></textarea>
          <span style='color:red;fontWeight:bolder;fontSize:14px'>{{err2}}</span>
          <button v-if='type=="post"' :disabled='err2!=""' @click='reportPost' style='width:70px' class="btn btn-sm btn-danger">Report</button>
          <button v-if='type=="comment"' :disabled='err2!=""' @click='reportComment' style='width:70px' class="btn btn-sm btn-danger">Report</button>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props:{
        postKey:String,
        type:String,
        commentKey:String,
    },
    data() {
        return {
            description:'',
            err2:''
        }
    },
    methods: {
        close(e) {
            if (this.type=="post") {
                if (e.target==document.querySelector(`div.post-com.${this.postKey} > div.cover`)) {
                    let cover=document.querySelector(`div.post-com.${this.postKey} > div.cover`)
                    cover.classList.remove('show')
                }
            }
            else if (this.type=="comment") {
                if (e.target==document.querySelector(`div.post-com.${this.postKey} > div.post-comments.show > div.${this.commentKey} > div.cover`)) {
                    let comment=document.querySelector(`div.post-com.${this.postKey} > div.post-comments.show > div.${this.commentKey} > div.cover`)
                    comment.classList.remove('show')
                }
            }
        },
        close_() {
            if (this.type=="post") {
                let cover=document.querySelector(`div.post-com.${this.postKey} > div.cover`)
                cover.classList.remove('show')
                this.description=''
                this.err1=''
                this.err2=''
            }
            else if (this.type=="comment") {
                let comment=document.querySelector(`div.post-com.${this.postKey} > div.post-comments.show > div.${this.commentKey} > div.cover`)
                comment.classList.remove('show')
                this.description=''
                this.err1=''
                this.err2=''
            }
            
        },
        reportPost() {
            if (this.description.trim()==''||this.description==null) {
                this.err2='Please enter your description.'
            }
            if (this.err2!='') {
                return
            }
            else {
                this.$bvModal.msgBoxConfirm('You want to report this post ?',{
                    title: 'Report Post',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Confirm',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        let report={
                            email:this.$store.state.user.email,
                            description:this.description,
                            type:'post',
                            postKey:this.postKey,
                        }
                        this.$store.dispatch('loading')
                        db.ref('report').push(report).then(()=>{
                            this.close_()
                            this.$store.dispatch('unload')
                            this.$bvToast.show('report')
                        }).catch(err=>{
                            alert(err)
                            this.$store.dispatch('unload')
                        })
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
            }
        },
        reportComment() {
            if (this.description.trim()==''||this.description==null) {
                this.err2='Please enter your description.'
            }
            if (this.err2!='') {
                return
            }
            else {
                this.$bvModal.msgBoxConfirm('You want to report this comment ?',{
                    title: 'Report Comment',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Confirm',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        let report={
                            email:this.$store.state.user.email,
                            description:this.description,
                            type:'comment',
                            postKey:this.postKey,
                            commentKey:this.commentKey
                        }
                        this.$store.dispatch('loading')
                        db.ref('report').push(report).then(()=>{
                            this.close_()
                            this.$store.dispatch('unload')
                            this.$bvToast.show('report')
                        }).catch(err=>{
                            alert(err)
                            this.$store.dispatch('unload')
                        })
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
            }
        }
    },
    watch: {
        description(e) {
            this.err2=''
        }
    }
}
</script>

<style>
div.post-com > div.cover, div.post-com div.post-comments > div > div.cover {
    background-color:rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100vw;
    min-height: 100vh;
    position: fixed;
    top:0;
    left:0;
    z-index:10px;
    visibility: hidden;
    opacity: 0;
}
div.post-com > div.cover.show,div.post-com div.post-comments > div > div.cover.show {
    visibility: visible;
    opacity: 1;
}
div.post-com > div.cover>div.post-report,div.post-com div.post-comments.show > div > div.cover>div.post-report{
    background-color:whitesmoke;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    width: 400px;
    height: auto;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    border-top:2px solid orangered;
}
div.cover div.post-report *:not(h5){
    width: 90%;
    margin:5px 0;
}
div.cover div.post-report textarea{
    border:1px solid gainsboro;
    max-height: 100px;
    min-height: 100px;
    font-size: 15px;
}
div.cover div.post-report textarea:focus{
    border-color: orange;
}

/* */
@media only screen and (max-width: 400px) {
    div.post-com > div.cover>div.post-report,div.post-com div.post-comments.show > div > div.cover>div.post-report{
       max-height: 100vh;
       overflow-y:auto;
       width: 95%;
    }
}
</style>