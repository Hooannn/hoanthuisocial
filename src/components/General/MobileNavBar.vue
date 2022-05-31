<template>
  <div @click='close_' class="mobile-nav-bar">
      <div class="mnb-inner">
          <div @click='close' onMouseOver='this.style.color="orange"' onMouseOut='this.style.color="unset"' style='position:absolute;right:0;top:0;height:30px;width:30px;fontSize:30px' class='center'><ion-icon name="close-circle-outline"></ion-icon></div>
          <div :class='{selected:$route.name==i.route}' v-for='i in items' :key='i.name+"key"' class="mnbi-item">
              {{i.name}}
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items:[
                {name:"ABOUT",route:'pre-home'},
                {name:"FEATURE",route:'n'},
                {name:"CONTACT",route:'n'},
                {name:"HELP",route:'n'},
            ]
        }
    },
    methods:{
        close_(e) {
            if (e.target==document.querySelector('#app > div.prehome-view > div.mobile-nav-bar')){
                document.querySelector('#app > div.prehome-view > div.mobile-nav-bar > div.mnb-inner').classList.remove('show')
                setTimeout(function() {
                    document.querySelector('#app > div.prehome-view > div.mobile-nav-bar').classList.remove('show')
                },300)
            }
        },
        close() {
            document.querySelector('#app > div.prehome-view > div.mobile-nav-bar > div.mnb-inner').classList.remove('show')
            setTimeout(function() {
                document.querySelector('#app > div.prehome-view > div.mobile-nav-bar').classList.remove('show')
            },300)
        }
    }
}
</script>

<style>
.mobile-nav-bar {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0;
    left:0;
    z-index:999;
    background-color:rgba(0,0,0,0.5);
    visibility: hidden;
    opacity: 0;
    font-family: "Poppins", sans-serif;
}
.mobile-nav-bar.show {
    visibility: visible;
    opacity: 1;
}
.mobile-nav-bar .mnb-inner {
    width: 0;
    height: 100vh;
    max-height: 100vh;
    position: absolute;
    left:0;
    top:0;
    background-color:white;
    box-shadow: 0 0 3px 2px rgba(0,0,0,0.3);
    transition:.3s linear;
    padding:30px 0;
}
.mobile-nav-bar .mnb-inner .mnbi-item {
    padding:10px;
    font-weight: bolder;
}
.mobile-nav-bar .mnb-inner .mnbi-item:hover {
    background-color:silver;
}
.mobile-nav-bar .mnb-inner .mnbi-item.selected {
    background-color:silver;
    border-right:3px solid orange;
}
.mobile-nav-bar .mnb-inner.show {
    width: 320px;
}
</style>