<template>
  <div class="new-item">
      <div :key='selectedImg' style='width:100px;height:70px;overflow:hidden;'><img class='slide' style='width:100%;height:100%;objectFit:cover' :src="itemImages[selectedImg]"></div>
      <div style='display:flex;flexDirection:column;alignItems:center;maxWidth:100px' class="item-info">
          <div style='fontSize:15px;color:orangered;fontWeight:bold;textAlign:center'>{{title}}</div>
          <div style='fontSize:16px;color:green;fontWeight:bold'>${{currentPrice}}</div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        title:String,
        itemImages:Array,
        currentPrice:Number,
    },
    data() {
        return {
            selectedImg:null,
            slideInterval:null,
        }
    },
    methods:{
        nextImg() {
            this.selectedImg++
            if (this.selectedImg==this.itemImages.length) {
                this.selectedImg=0
            }
        }
    },
    mounted() {
        let randomImage=Math.floor(Math.random() * (this.itemImages.length - 0 + 1)) + 0;
        let randomInterval=Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
        setInterval(this.nextImg,randomInterval)
        this.selectedImg=randomImage
    },
    destroyed() {
        clearInterval(this.slideInterval)
    }
}
</script>

<style>
.new-item {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.new-item>div>img.slide {
    animation: slide .5s linear;
}
@keyframes slide {
    0% {
        transform:translateX(-100%)
    }
    100% {
        transform: translateX(0);
    }
}
</style>