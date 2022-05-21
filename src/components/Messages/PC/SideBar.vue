<template>
  <div class="side-bar">
      <div class="sb-header ">
          <div class="sbh-title center">Messages</div>
          <div class="sbh-search center">
              <div class="icon center"><ion-icon name="search-outline"></ion-icon></div>
              <input @blur='onBlur' @focus="onFocus" placeholder="Search..." type="text">
          </div>
      </div>
      <div class="sb-content">
          <div class='loader center' v-if='myContacts.length==0'></div>
          <contact-user v-for='(contact,index) in myContacts' :key='index' :contact='contact'/>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import ContactUser from './ContactUser.vue'
export default {
  components: { ContactUser },
    data() {
        return {
            messages:[],
            myContacts:[],
        }
    },
    watch: {
        messages() {
            this.myContacts=[]
            this.messages.forEach(message => {
                if (message.user1==this.$store.state.ukey||message.user2==this.$store.state.ukey) {
                    this.myContacts.push(message)
                }
            });
        }
    },
    methods:{
        onFocus() {
            document.querySelector('div.side-bar div.sb-header div.sbh-search').classList.add('focus')
        },
        onBlur() {
            document.querySelector('div.side-bar div.sb-header div.sbh-search').classList.remove('focus')
        }
    },
    mounted() {
        this.$rtdbBind('messages',db.ref('messagesData'))
    }
}
</script>

<style>
.side-bar {
    padding-top:50px;
    min-width: 400px;
    width: 400px;
    border-right: 1px solid silver;
}
.side-bar .sb-header {
    padding-bottom:25px;
    width: 100%;
}
.side-bar .sb-header .sbh-title {
    font-size: 19px;
    padding:7px 0;
    font-weight: bold;
}
.side-bar .sb-header .sbh-search {
    width: 80%;
    border-radius: 50px;
    height: 40px;
    overflow: hidden;
    background-color:rgba(0,0,0,0.1);
    margin:0 auto;
    box-shadow: 0 0 3px rgba(0,0,0,0.4);
    transition:background .1s linear;
}
.side-bar .sb-header .sbh-search.focus {
    border:2px solid orange;
    box-shadow: none;
    background: transparent;
}
.side-bar .sb-header .sbh-search .icon {
    width: 10%;
    font-size: 18px;
    cursor: pointer;
    height: 100%;
    transition:.2s linear;
}
.side-bar .sb-header .sbh-search .icon:hover {
    background-color:rgba(0,0,0,0.2);
}
.side-bar .sb-header .sbh-search input {
    outline:none;
    border:none;
    background:transparent;
    width: 90%;
    height: 100%;
    padding:5px;
    font-size: 15px;
}
.side-bar .sb-content {
    overflow-y:auto;
    max-height: 90%;
}
.side-bar .sb-content .loader {
    margin:0 auto;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border:10px solid white;
    border-top-color: var(--blue);
    animation: spin .5s linear infinite;
}
@keyframes spin {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}

/*  */
@media only screen and (max-width: 1200px) {
  .side-bar {
      min-width: 300px;
      width: 300px;
  }
}
@media only screen and (max-width: 920px) {
  .side-bar {
      min-width: 250px;
      width: 250px;
  }
}
@media only screen and (max-width: 810px) {
  .side-bar {
      min-width: 200px;
      width: 200px;
  }
}
@media only screen and (max-width: 768px) {
  .side-bar {
      min-width: 100%;
      width: 100%;
  }
}
/*  */
</style>