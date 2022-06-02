<template>
  <div class="stories-area" style='display:flex'>
    <div class="sa-create">
          
    </div>
    <div class="sa-container">
        <carousel class='sac-carousel' style='position:relative' :autoHeight="true" :dots="false" :autoplay="false" :nav="false" :items=3>
            
        </carousel>
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
    components:{carousel}
}
</script>

<style>

</style>