<template>
    <div class="footer-bar">
          <div class="top-footer">
              <div class="tf-content">
                <div class="tf-store">
                    <div style='display:flex'>
                        <img @click='goHome' style='width:200px;cursor:pointer' :src="icon">
                    </div>
                    <div>
                        <span><strong>Phone:</strong> 0101010101</span>
                    </div>
                    <div>
                        <span><strong>Address:</strong> hoanthui's Social</span>
                    </div>
                    <div>
                        <span><strong>Email:</strong> hoanthuisocial@gmail.com</span>
                    </div>
                    <div>
                        <a target="_blank" href="https://www.facebook.com/nguyenduckhaihoan" style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-facebook"></ion-icon></a >
                        <a target="_blank" href="https://www.twitter.com/" style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-twitter"></ion-icon></a >
                        <a target="_blank" href="https://www.pinterest.com/" style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-pinterest"></ion-icon></a >
                        <a target="_blank" href="https://www.instagram.com//hoanthui" style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-instagram"></ion-icon></a >
                    </div>
                </div>
                <div class="tf-information">
                    <h5>INFORMATION</h5>
                    <span @click='goHome'>About</span>
                    <span >Terms of Service</span>
                    <span >Privacy Policy</span>
                </div>
                <div class="tf-newsletter">
                    <h5>NEWSLETTER</h5>
                    <input v-model='email' style='outline:none;width:220px' type="email" placeholder="Enter your mail...">
                    <span style='color:red;fontSize:13.5px;'>{{err}}</span>
                    <button @click='send' style='width:60px;margin:5px;' class="btn btn-sm btn-dark">SEND</button>
                </div>
              </div>
          </div>
          <div class="bottom-footer">
              <div class="bf-content">
                  <div class="bf-copyright">
                    <span style='color:white'><i class="fas fa-copyright"></i> CopyRight 2022 <span style='color:orange;fontWeight:bolder'>hoanthui's Social</span></span>
                  </div>
                  <div style='width:100px;display:flex;justifyContent:space-between;alignItems:center' class="bf-supported">
                    <span class='center' style='color:orange;fontSize:24px'><ion-icon name="logo-firebase"></ion-icon></span>
                    <span class='center' style='color:rgb(66, 184, 131);fontSize:24px'><ion-icon name="logo-vue"></ion-icon></span>
                    <span><img style='width:24px;height:24px' src="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9mZjEwYzJhMzFjYWU2NDBhYmE1Nzg3M2NiOThiZTMxZD9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.4q7HIQsk0OSzLwJ4X9d6yqz-bXevqJV8IhZGRQT0j7U"></span>
                  </div>
              </div>
          </div>
  </div>
</template>

<script>
import icon from '@/assets/images/textlogo.png'
export default {
    data() {
        return {
            icon:icon,
            email:'',
            err:''
        }
    },
    watch: {
        email(e) {
            if (e.trim()!='' && e!=null) {
                this.err=''
            }
        }
    },
    methods: {
        send() {
            if (this.email.trim()=='' || this.email==null) {
                this.err='Your email is empty.'
                return
            }
            else {
                this.$bvModal.msgBoxOk('Thanks you. Check your email regularly to get news information.', {
                        title: 'Success',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                })
                this.email=''
            }
        },
        goHome() {
            document.documentElement.scrollTop=0
        }
    }
}
</script>

<style>
.footer-bar {
    width: 100vw;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 2px rgba(0,0,0,0.4);
    font-family: "Poppins", sans-serif;
}
.footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
    width: 1280px;
    margin:0 auto;
}
.footer-bar .top-footer .tf-content {
    display: flex;
    justify-content: space-between;
}
.footer-bar .top-footer .tf-content .tf-store,.footer-bar .top-footer .tf-content .tf-information,.footer-bar .top-footer .tf-content .tf-newsletter {
    width: 30%;
    display: flex;
    flex-direction: column;
}
.footer-bar .top-footer .tf-content .tf-information span {
    cursor: pointer;
    transition: .2s linear;
}
.footer-bar .top-footer .tf-content .tf-information span:hover {
    color:orange;
}
.footer-bar .top-footer .tf-content .tf-store>div {
    padding:5px;
}
.footer-bar .top-footer .tf-content .tf-information * {
    padding:5px
}
.footer-bar .top-footer .tf-content .tf-newsletter * {
    padding:5px
}
.footer-bar .top-footer .tf-content .tf-newsletter input {
    border:none;
    border:1px solid gainsboro;
}
.footer-bar .top-footer .tf-content .tf-newsletter input:focus {
    border-color:orange;
}
.footer-bar .top-footer {
    background-color:white;
    padding:10px 0;
}
.footer-bar .bottom-footer {
    padding:10px 0;
    background-color:black;
}
.footer-bar .bottom-footer .bf-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/*  */
@media only screen and (max-width: 1280px) {
    .footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
        width: 1190px;
        margin:0 auto;
    }
}
@media only screen and (max-width: 1190px) {
    .footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
        width: 768px;
        margin:0 auto;
    }
}
@media only screen and (max-width: 768px) {
    .footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    .footer-bar .top-footer .tf-content .tf-information,.footer-bar .top-footer .tf-content .tf-newsletter {
        margin-top: 10px;
    }
    .footer-bar .top-footer .tf-content .tf-store,.footer-bar .top-footer .tf-content .tf-information,.footer-bar .top-footer .tf-content .tf-newsletter {
        width: 100%;
        display: flex;
        align-items: center;
    }
}
</style>