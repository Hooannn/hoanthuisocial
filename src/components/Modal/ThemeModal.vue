<template>
  <div @click='close_' class="theme-modal ">
      <div style='position:relative' class="tm-inner">
          <div @click='changeTheme(theme)' :class='{selected:theme.name==$store.state.apptheme.name}' v-for='theme in themes' :key="'theme'+theme.name" class='tmi-theme'>
              <div style=';width:40px;height:40px;boxShadow:1px 1px 3px rgba(0,0,0,0.4);borderRadius:4px' :style='{background:theme.bgColor}'>

              </div>
              <div style='marginLeft:5px'>
                  {{theme.name}}
              </div>
          </div>
          <div @click='close' class='tmi-close center'><ion-icon name="close-circle-outline"></ion-icon></div>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
    data() {
        return {
            themes:[
                {name:"Sea",bgColor:"linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)",color:"black"},
                {name:"Banana",bgColor:"linear-gradient(315deg, #f1dfd1 0%, #f6f0ea 74%)",color:"black"},
                {name:"Newspaper",bgColor:"url('https://wallpaperaccess.com/full/4413581.jpg')",color:"black"},
                {name:"Lego Brick",bgColor:"linear-gradient(315deg, #deebdd 0%, #bbdbbe 74%)",color:"black"},
                {name:"History Book",bgColor:"linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)",color:"black"},
            ]
        }
    },
    methods: {
        changeTheme(theme) {
            this.$store.state.apptheme=theme
            db.ref('usersInformation').child(this.$store.state.ukey).child('apptheme').set(theme)
        },
        close_(e) {
            if (e.target==document.querySelector('#app div.theme-modal')) {
                document.querySelector('#app div.theme-modal').classList.remove('show')
            }
        },
        close() {
            document.querySelector('#app div.theme-modal').classList.remove('show')
        }
    },
}
</script>

<style>
.theme-modal {
    width: 100vw;
    height: 100vh;
    position:fixed;
    background-color:rgba(0,0,0,0.5);
    top:0;
    left:0;
    z-index: 100;
    display: none;
    justify-content: center;
    align-items: center;
}
.theme-modal.show {
    display: flex;
}
.theme-modal .tm-inner {
    animation: zoom .3s linear;
}
@keyframes zoom {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
.theme-modal .tm-inner{
    box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    background-color: white;
    border-radius: 10px;
    width: 320px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    padding:30px 10px;
}
.theme-modal .tm-inner .tmi-theme {
    display: flex;
    align-items: center;
    padding:10px;
    cursor: pointer;
}
.theme-modal .tm-inner .tmi-theme.selected {
    cursor:unset;
    background-color:silver;
}
.theme-modal .tm-inner .tmi-theme.selected:hover {
    background-color:silver;
}
.theme-modal .tm-inner .tmi-theme:hover {
    background-color:rgba(0,0,0,0.1);
}
.theme-modal .tm-inner .tmi-close {
    position:absolute;
    right:5px;
    top:5px;
    font-size: 25px;
    color:grey;
    transition:.2s linear;
    cursor: pointer;
}
.theme-modal .tm-inner .tmi-close:hover {
    transform: rotate(90deg) scale(1.1);
    color:orangered;
}
</style>