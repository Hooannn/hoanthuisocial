<template>
  <div @click='close_' class="image-review-modal ">
      <div style='position:relative' class="irm-image">
          <img alt="Image">
          <div @click='close' class='irmi-close center'><ion-icon name="close-circle-outline"></ion-icon></div>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        close_(e) {
            if (e.target==document.querySelector('#app div.image-review-modal')) {
                document.querySelector('#app div.image-review-modal').classList.remove('show')
            }
        },
        close() {
            document.querySelector('#app div.image-review-modal').classList.remove('show')
        }
    }
}
</script>

<style>
.image-review-modal {
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
.image-review-modal.show {
    display: flex;
}
.image-review-modal .irm-image {
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
.image-review-modal .irm-image img {
    height: 600px;
    max-width: 90vw;
    object-fit: contain;
}
.image-review-modal .irm-image .irmi-close {
    position:absolute;
    right:5px;
    top:5px;
    font-size: 25px;
    color:grey;
    transition:.2s linear;
    cursor: pointer;
}
.image-review-modal .irm-image .irmi-close:hover {
    transform: rotate(90deg) scale(1.1);
    color:orangered;
}
</style>