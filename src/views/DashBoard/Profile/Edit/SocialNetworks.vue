<template>
  <div class="social-networks">
      <h5>Social Networks</h5>
      <div class='network' >
          <div class="icon">
              <img :src="socialIcons[0]">
          </div>
          <input v-model='facebook' :placeholder="placeholder.facebook" type="text" >
      </div>
      <div class='network' >
          <div class="icon">
              <img :src="socialIcons[1]">
          </div>
          <input v-model='github' :placeholder="placeholder.github" type="text" >
      </div>
      <div class='network' >
          <div class="icon">
              <img :src="socialIcons[2]">
          </div>
          <input v-model='instagram' :placeholder="placeholder.instagram" type="text" >
      </div>
      <div class='network' >
          <div class="icon">
              <img :src="socialIcons[3]">
          </div>
          <input v-model='pinterest' :placeholder="placeholder.pinterest" type="text" >
      </div>
      <div class='network' >
          <div class="icon">
              <img :src="socialIcons[4]">
          </div>
          <input v-model='twitter' :placeholder="placeholder.twitter" type="text" >
      </div>
      <div class='network' >
          <div class="icon">
              <img :src="socialIcons[5]">
          </div>
          <input v-model='youtube' :placeholder="placeholder.youtube" type="text" >
      </div>
      <button @click='saveChanges' style='color:white;fontWeight:800;margin:30px;width:50px' class="btn btn-danger btn-sm">Save</button>
  </div>
</template>

<script>
import db from './../../../../plugins/firebase'
export default {
    data() {
        return {
            socialIcons:[
                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/640px-Facebook_icon_2013.svg.png',
                'https://cdn3.iconfinder.com/data/icons/inficons/512/github.png',
                'https://cdn4.iconfinder.com/data/icons/colorful-guache-social-media-logos-1/155/social-media_instagram-black-512.png',
                'https://www.batdongsanhungphat.vn/wp-content/uploads/2021/10/pinterest-icon.png',
                'https://www.batdongsanhungphat.vn/wp-content/uploads/2021/10/twitter-logo-icon-vector-29228035.jpg',
                'https://i.pinimg.com/originals/46/02/cb/4602cbc18967da9c1eba7452905cd99b.png',
            ],
            currentSocialNetworks:{

            },
            placeholder: {
                facebook:'https://www.facebook.com/',
                github:'https://www.github.com/',
                instagram:'https://www.instagram.com/',
                pinterest:'https://www.pinterest.com/',
                twitter:'https://www.twitter.com/',
                youtube:'https://www.youtube.com/channel/'
            },
            facebook:'',
            twitter:'',
            github:'',
            pinterest:'',
            instagram:'',
            youtube:'',
        }
    },
    methods: {
        saveChanges() {
            if (
                this.facebook != this.currentSocialNetworks.facebook ||
                this.instagram != this.currentSocialNetworks.instagram ||
                this.twitter != this.currentSocialNetworks.twitter ||
                this.github != this.currentSocialNetworks.github ||
                this.pinterest != this.currentSocialNetworks.pinterest ||
                this.youtube != this.currentSocialNetworks.youtube 
            ) { 
                this.$store.dispatch('loading')
                let social= {
                    facebook:this.facebook.trim(),
                    instagram:this.instagram.trim(),
                    twitter:this.twitter.trim(),
                    github:this.github.trim(),
                    pinterest:this.pinterest.trim(),
                    youtube:this.youtube.trim(),
                }
                db.ref('usersInformation').child(this.$store.state.ukey).child('socialAccounts').set(social)
                .then(()=> {
                    this.$store.dispatch('unload')
                }).catch(() => this.$store.dispatch('unload'))
                this.$bvToast.show('edit')
                /*
                db.ref('usersInformation').child(this.$store.state.ukey).child('socialAccounts').child('facebook').set(this.facebook.trim())
                db.ref('usersInformation').child(this.$store.state.ukey).child('socialAccounts').child('instagram').set(this.instagram.trim())
                db.ref('usersInformation').child(this.$store.state.ukey).child('socialAccounts').child('twitter').set(this.twitter.trim())
                db.ref('usersInformation').child(this.$store.state.ukey).child('socialAccounts').child('github').set(this.github.trim())
                db.ref('usersInformation').child(this.$store.state.ukey).child('socialAccounts').child('pinterest').set(this.pinterest.trim())
                db.ref('usersInformation').child(this.$store.state.ukey).child('socialAccounts').child('youtube').set(this.youtube.trim())
                */
                this.$router.push({name:'about',params:{key:this.$store.state.ukey}})
            }
            else {
                this.$bvToast.show('alert-no-change')
                return
            }
            
        }
    },
    watch: {
        currentSocialNetworks() {
            this.facebook=this.currentSocialNetworks.facebook
            this.youtube=this.currentSocialNetworks.youtube
            this.instagram=this.currentSocialNetworks.instagram
            this.pinterest=this.currentSocialNetworks.pinterest
            this.twitter=this.currentSocialNetworks.twitter
            this.github=this.currentSocialNetworks.github
        }
    },
    mounted() {
        this.$rtdbBind('currentSocialNetworks',db.ref('usersInformation').child(this.$store.state.ukey).child('socialAccounts'))
    }
}
</script>

<style>
.social-networks {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color: white;
}
.social-networks h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
.social-networks .network {
    width: 100%;
    padding:30px;
    display: flex;
    align-items: center;
}
.social-networks .network .icon{
    width: 35px;
    height: 35px;
    border-radius:5px;
    overflow: hidden;
}
.social-networks .network input{
    height: 35px;
    padding:0 10px;
    width: 100%;
    outline:none;
    border:none;
    border:1px solid gainsboro;
}
.social-networks .network .icon img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>