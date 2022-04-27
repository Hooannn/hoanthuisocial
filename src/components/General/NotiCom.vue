<template>
  <div @click="seenNoti" class="noti-com">
    <div v-if="type != 'group'" class="status">
      <div v-if="noti.status == 'Unseen'"></div>
    </div>
    <div class="type">
      <ion-icon
        v-if="noti.type == 'like-blog'"
        class="icon"
        name="heart-outline"
      ></ion-icon>
      <ion-icon
        v-if="noti.type == 'comment-blog'"
        class="icon"
        name="chatbox-outline"
      ></ion-icon>
      <ion-icon
        v-if="noti.type == 'new-blog' || noti.type == 'group-new-blog'"
        class="icon"
        name="newspaper-outline"
      ></ion-icon>
      <ion-icon
        v-if="noti.type == 'send-message'"
        class="icon"
        name="chatbubbles-outline"
      ></ion-icon>
      <ion-icon
        v-if="
          noti.type == 'send-friendInvite' || noti.type == 'group-user-request'
        "
        class="icon"
        name="person-add-outline"
      ></ion-icon>
      <ion-icon
        v-if="noti.type == 'accept-friendInvite'"
        class="icon"
        name="people-outline"
      ></ion-icon>
      <ion-icon
        v-if="noti.type == 'follow'"
        class="icon"
        name="eye-outline"
      ></ion-icon>
      <ion-icon
        v-if="noti.type == 'send-group-request'"
        class="icon"
        name="enter-outline"
      ></ion-icon>
      <ion-icon
        v-if="
          noti.type == 'accept-group-request' ||
          noti.type == 'group-user-accept'
        "
        class="icon"
        name="checkmark-outline"
      ></ion-icon>
      <ion-icon
        v-if="
          noti.type == 'refuse-group-request' || noti.type == 'group-delete'
        "
        class="icon"
        name="close-outline"
      ></ion-icon>
      <ion-icon
        v-if="noti.type == 'group-create'"
        class="icon"
        name="checkmark-done"
      ></ion-icon>
      <ion-icon
        v-if="noti.type == 'group-user-leave'"
        class="icon"
        name="person-remove-outline"
      ></ion-icon>
      <ion-icon
        v-if="noti.type == 'page-create'"
        class="icon"
        name="document-outline"
      ></ion-icon>
    </div>
    <div v-if="noti.type != 'group-delete'" class="avatar">
      <img :src="ava['.value']" />
    </div>
    <div class="content">
      <span style="color: black" class="text"
        ><Strong>{{ noti.content }}</Strong></span
      >
      <div class="time">{{ getTime }}</div>
    </div>
  </div>
</template>

<script>
import EventBus from "../../eventbus";
import router from "../../router/router";
import db from "../../plugins/firebase";
import store from "../../store/store";
export default {
  props: {
    notiKey: String,
    type: String,
    groupKey: String,
  },
  data() {
    return {
      noti: {},
      ava: {},
    };
  },
  computed: {
    getTime() {
      let time = (new Date().getTime() - -this.noti.time) / 1000;
      time = parseInt(time, 10);
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor((time - hours * 3600) / 60);
      let seconds = time - hours * 3600 - minutes * 60;
      let days = Math.floor(hours / 24);
      let weeks = Math.floor(days / 7);
      let months = Math.floor(weeks / 4);
      let years = Math.floor(months / 12);
      if (years != 0) {
        if (years == 1) {
          return `A year ago.`;
        } else {
          return `${years} years ago.`;
        }
      }
      if (minutes == 0 && hours == 0) {
        if (seconds == 1 || seconds == 0) {
          return `A second ago.`;
        } else {
          return `${seconds} seconds ago.`;
        }
      } else if (hours == 0 && minutes != 0) {
        if (minutes == 1) {
          return `A minute ago.`;
        } else {
          return `${minutes} minutes ago.`;
        }
      } else if (days == 0 && hours != 0) {
        if (hours == 1) {
          return `A hour ago.`;
        } else {
          return `${hours} hours ago.`;
        }
      } else if (weeks == 0 && days != 0) {
        if (days == 1) {
          return `A day ago.`;
        } else {
          return `${days} days ago.`;
        }
      } else if (months == 0 && weeks != 0) {
        if (weeks == 1) {
          return `A week ago.`;
        } else {
          return `${weeks} weeks ago.`;
        }
      } else if (years == 0 && months != 0) {
        if (months == 1) {
          return `A month ago.`;
        } else {
          return `${months} months ago.`;
        }
      }
    },
  },
  methods: {
    seenNoti() {
      ///
      if (this.type == "group") {
        return;
      }
      db.ref("usersInformation")
        .child(this.$store.state.ukey)
        .child("notifications")
        .child(this.notiKey)
        .child("status")
        .set("Seen")
        .then(() => {
          if (
            this.noti.type == "follow" ||
            this.noti.type == "accept-friendInvite"
          ) {
            let ukey = this.noti.ukey;
            router.push({ name: "post", params: { key: ukey } });
          } else if (this.noti.type == "send-friendInvite") {
            router.push({ name: "friends", params: { key: store.state.ukey } });
          } else if (
            this.noti.type == "like-blog" ||
            this.noti.type == "new-blog"
          ) {
            let postKey = this.noti.postKey;
            let likeukey = this.$store.state.ukey;
            let newukey = this.noti.ukey
            if (this.noti.type=='like-blog') {
                router.push({
                    name: "post-detail",
                    params: { key: likeukey, postKey: postKey },
                });
            }
            else if (this.noti.type=='new-blog') {
                router.push({
                    name: "post-detail",
                    params: { key: newukey, postKey: postKey },
                });
            }
          } else if (this.noti.type == "comment-blog") {
            let commentKey = this.noti.commentKey;
            let postKey = this.noti.postKey;
            let ukey = this.$store.state.ukey;
            router.push({
              name: "post-detail",
              params: { key: ukey, postKey: postKey },
            });
            /*
                        setTimeout(function() {
                            EventBus.$emit('showCom', commentKey)
                        },100)
                        */
          } else if (
            this.noti.type == "send-group-request" ||
            this.noti.type == "accept-group-request" ||
            this.noti.type == "refuse-group-request" ||
            this.noti.type == "group-create"
          ) {
            let groupKey = this.noti.groupKey;
            router.push({ name: "group-post", params: { key: groupKey } });
          } else if (this.noti.type == "send-message") {
            this.$store.dispatch("addMsgData", this.noti.messageKey);
          } else if (this.noti.type == "page-create") {
            router.push({
              name: "communities",
              params: { key: store.state.ukey },
            });
          } else if (this.noti.type=="group-new-blog") {
            router.push({name:'group-post-detail',params:{postKey:this.noti.postKey,key:this.noti.groupKey}})
          }
          else {
            return;
          }
        });
    },
  },
  mounted() {
    if (this.type != "group") {
      this.$rtdbBind(
        "noti",
        db
          .ref("usersInformation")
          .child(this.$store.state.ukey)
          .child("notifications")
          .child(this.notiKey)
      );
      if (
        this.noti.type == "send-group-request" ||
        this.noti.type == "accept-group-request" ||
        this.noti.type == "refuse-group-request" ||
        this.noti.type == "group-create"
      ) {
        this.$rtdbBind(
          "ava",
          db.ref("groups").child(this.noti.ukey).child("avatarImg")
        );
      } else {
        this.$rtdbBind(
          "ava",
          db.ref("usersInformation").child(this.noti.ukey).child("avatarImg")
        );
      }
    } else if (this.type == "group") {
      this.$rtdbBind(
        "noti",
        db
          .ref("groups")
          .child(this.groupKey)
          .child("notifications")
          .child(this.notiKey)
      );
      this.$rtdbBind(
        "ava",
        db.ref("usersInformation").child(this.noti.ukey).child("avatarImg")
      );
      /*
            if (this.noti.type=="send-group-request" ||this.noti.type=="accept-group-request"||this.noti.type=="refuse-group-request"||this.noti.type=="group-create") {
                this.$rtdbBind('ava', db.ref('groups').child(this.noti.ukey).child('avatarImg'))
            }
            else {
                this.$rtdbBind('ava', db.ref('usersInformation').child(this.noti.ukey).child('avatarImg'))
            }
            */
    }
  },
};
</script>

<style>
div.noti-com {
  width: 100%;
  min-height: 80px;
  max-height: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  padding: 0;
  margin: 0;
}
div.noti-com:hover {
  background-color: white;
}
div.noti-com:hover .type .icon {
  background-color: white;
}
div.noti-com .status {
  width: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
div.noti-com .status > div {
  width: 5px;
  height: 5px;
  background-color: orange;
  border-radius: 50%;
}
div.noti-com .type {
  width: 10px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
}
div.noti-com .type .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  z-index: 10;
  padding: 10px 0;
  background-color: rgb(243, 234, 224);
  color: rgb(51, 51, 51);
}
div.noti-com .content {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  font-size: 13.5px;
}
div.noti-com .avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgb(255, 69, 0, 0.7);
}
div.noti-com .avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
