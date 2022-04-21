<template>
  <div id="footer">
      <div class='footer__left'>
          <a href='#' class="footer__github">Github</a>
          <div class="footer__about">About</div>
          <div class="footer__faqs">FAQs</div>
      </div>
      <div class="footer__right">
          <div class="footer__tos">Terms of Service</div>
          <div class="pp">Privacy Policy</div>
          <div class="copyright" style='opacity:0.7'><img style='opacity:1;height:30px;width:30px;marginRight:5px' src="https://imgkub.com/images/2022/04/06/imageab269462ca213400.png" class='small-logo'><i style='fontWeight:100;marginRight:2px' class="fas fa-copyright"></i> hoanthui's Social</div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#footer {
    position: static;
    margin-top:auto;
    bottom: 0;
    left:0;
    width: 100%;
    min-height: 35px;
    background-color:white;
    color:rgba(15, 8, 8, 0.8);
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bolder;
    box-shadow: 1px 0 5px rgba(0,0,0,0.2);
}
#footer a {
    text-decoration: none;
}
.footer__left {
    position: absolute;
    left:0;
    display: flex;
}
.footer__left div,.footer__left a{
    margin:0 10px;
    transition: .2s;
}
.footer__right {
    position: absolute;
    right:0;
    display:flex;
}
.footer__right div, .footer__right a{
    margin:0 10px;
    transition: .2s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.footer__left div:hover,.footer__right div:hover:not(.copyright),.footer__left a:hover{
   color:#ff7555;
   cursor: pointer;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
   .footer__left, .footer__right {
       position: relative;
   }
   #footer {
       font-size: 9px;
       display: flex;
       justify-content: space-between;
       align-items: center;
   }
}
@media only screen and (max-width: 420px) {
  /* For mobile phones: */
   .footer__left, .footer__right {
       position: relative;
       flex-direction: column;
   }
}
</style>