<template>
  <div class="side-bar" :style={backgroundColor:$store.state.messagetheme.bgColor,color:$store.state.messagetheme.color}>
      <div class="sb-header ">
          <div class="sbh-title center">Messages</div>
          <div class="sbh-search center">
              <div class="icon center"><ion-icon name="search-outline"></ion-icon></div>
              <input :disabled='load' v-model='searchVal' @blur='onBlur' @focus="onFocus" placeholder="Search..." type="text">
          </div>
      </div>
      <div v-if='searchResults.length==0&&searchVal==""' class="sb-content">
          <div class='loader center' v-if='load'></div>
          <div class='center' v-if='myContacts.length==0&&messages.length'>You don't have any contacts.</div>
          <contact-user v-for='(contact,index) in myContacts' :key='"fullContact"+index' :contact='contact'/>
      </div>
      <div v-if='searchResults.length>0' class="sb-content">
          <contact-user v-for='(contact,index) in searchResults' :key='"searchContact"+index' :contact='contact'/>
      </div>
      <div v-if='searchResults.length==0&&searchVal!=""' class="sb-content">
          <div class='center'>No contacts found.</div>
      </div>
      <div v-if='myContacts.length==0&&messages.length&&$route.name=="messages"' id='waiting-picture'>
          <div id="cat">
              <img :src="cat" alt="Cat moving">
              <br>
              <div id="spinner-grow">
                <div v-for="i in 5" :key='i'></div>
              </div>
              <div style='margin: 20px auto'>
                  Waiting...
              </div>
          </div>
          <div id="sun">
              <img :src="sun" alt="Sun rising">
          </div>
      </div>
  </div>
</template>

<script>
import cat from '@/assets/gifs/cat.gif'
import sun from '@/assets/gifs/sun.gif'
import db from '@/plugins/firebase'
import ContactUser from './ContactUser.vue'
export default {
  components: { ContactUser },
    data() {
        return {
            searchVal:'',
            searchResults:[],
            messages:[],
            myContacts:[],
            contactNameList:[],
            load:true,
            defaultMessage:0,
            cat:cat,
            sun:sun,
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
        },
        myContacts() {
            this.contactNameList=[]
            this.myContacts.forEach(c => {
                if (c.user1==this.$store.state.ukey) {
                    db.ref('usersInformation').child(c.user2).get().then(res=>{
                        let contactWithName=c
                        contactWithName.contactName=res.val().username
                        this.contactNameList.push(contactWithName)
                    })
                }
                else if (c.user2==this.$store.state.ukey) {
                    db.ref('usersInformation').child(c.user1).get().then(res=>{
                        let contactWithName=c
                        contactWithName.contactName=res.val().username
                        this.contactNameList.push(contactWithName)
                    })
                }
            });
        },
        searchVal(e) {
            if (e.trim()!=''&&e!=null) {
                this.searchResults=[]
                this.contactNameList.forEach(c => {
                    if (c.contactName.toLowerCase().trim().replace(/\s+/g, "").includes(e.toLowerCase().trim().replace(/\s+/g, ""))) {
                        this.searchResults.push(c)
                    }
                });
            }
            else {
                this.searchResults=[]
            }
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
        this.$rtdbBind('messages',db.ref('messagesData')).then(()=>{
            this.load=false
            if (this.myContacts.length>0&&this.$route.name=="messages") {
                this.$router.push({name:"message-detail",params:{id:this.myContacts[this.defaultMessage][".key"]}})
            }
        })
    }
}
</script>

<style>
#waiting-picture {
    pointer-events: none;
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
}
#sun {
    position:absolute;
    right:0;
}
#cat {
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
}
#spinner-grow {
    margin:0 auto;
    width: 50%;
    display: inline-flex;
    justify-content: space-around;
}
#spinner-grow div {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color:var(--secondary);
    opacity: 0;
    animation: load 1.5s linear infinite;
}
@keyframes load {
    0% {
        transform: scale(0);
    }
    50% {
        opacity: 1;
        transform: none;
    }
}
.side-bar {
    padding-top:50px;
    min-width: 400px;
    width: 400px;
    transition:.2s linear;
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
    animation: spin1 .5s linear infinite;
}
@keyframes spin1 {
    0% {
        transform:rotate(0);
    }
    100% {
        transform:rotate(360deg);
    }
}

/*  */
@media only screen and (max-width: 1200px) {
  .side-bar {
      min-width: 300px;
      width: 300px;
  }
  #cat {
      transform:translate(-50%,-50%) scale(0.7);
  }
  #sun {
      transform: scale(0.5);
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
      min-height: 100%;
  }
}
/*  */
</style>