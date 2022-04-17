<template>
  <div class="personal-info">
    <!--  -->
      <div class="personal">
        <h5>Personal Info</h5>
        <div class="sec-1">
          <div class="username">
            <span >Username</span>
            <input v-model='username' type="text" :placeholder="user.username">
          </div>
          <div class="dob">
            <span>Date of Birth</span>
            <input v-model='dob' type="date" :placeholder="user.dob">
          </div>
        </div>
        <div class="sec-2">
          <div class="email">
            <span >Email Address</span>
            <input type="text" :placeholder="user.email" disabled>
          </div>
          <div class="phone">
            <span>Phone Number</span>
            <input v-model='phone' type="text" :placeholder="user.phone">
          </div>
        </div>
        <div class="sec-3">
          <div class="gender">
            <span >Gender</span>
            <select v-model='gender' id="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="status">
            <span>Status</span>
            <select v-model='statusrel' id="status">
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="In a relationship">In a relationship</option>
              <option value="It's complicated">It's complicated</option>
            </select>
          </div>
        </div>
        <!--
        <div class="sec-4"></div> Update city blabla soon
        -->
      </div>
    <!--  -->
    <!--  -->
      <div class="about">
        <h5>About Description</h5>
        <div style='width:100%;padding:30px'>
          <div style='fontSize:14px;fontWeight:800'>Description Here</div>
          <textarea v-model='description' style='width:100%;min-height:100px;margin:10px 0;padding:10px' :placeholder="user.description" ></textarea>
        </div>
      </div>
    <!--  -->
    <!--  -->  
      <div class="education">
        <button @click='addNewEducation' style='width:80px;marginTop:5px;marginLeft:5px' class="btn btn-sm btn-dark">Add New</button>
        <h5>Education</h5>
        <div style='padding:20px'>
          <div style='fontSize:15px;fontWeight:900'>Title</div>
          <input v-model='education.title' placeholder="Title" style='margin:7px 0;padding:7px;width:100%' type="text">
          <div style='margin:7px 0;display:flex;width:100%;justifyContent:space-between'>
            <input v-model='education.from' placeholder="From" style='padding:7px;width:47%' type="text" >
            <input v-model='education.to' placeholder="to" style='padding:7px;width:47%' type="text" >
          </div>
          <input v-model='education.website' placeholder="http://website.com" style='margin:7px 0;padding:7px;width:100%' type="text" >
        </div>
      </div>
    <!--  -->
    <!--  -->  
      <div class="employment">
        <button @click='addNewEmployment' style='width:80px;marginTop:5px;marginLeft:5px' class="btn btn-sm btn-dark">Add New</button>
        <h5>Employment</h5>
        <div style='padding:20px'>
          <div style='fontSize:15px;fontWeight:900'>Title</div>
          <input v-model='employment.title' placeholder="Title" style='margin:7px 0;padding:7px;width:100%' type="text">
          <div style='margin:7px 0;display:flex;width:100%;justifyContent:space-between'>
            <input v-model='employment.from' placeholder="From" style='padding:7px;width:47%' type="text" >
            <input v-model='employment.to' placeholder="to" style='padding:7px;width:47%' type="text" >
          </div>
          <input v-model='employment.website' placeholder="http://website.com" style='margin:7px 0;padding:7px;width:100%' type="text" name="" id="">
        </div>
      </div>
    <!--  --> 
    <!--  --> 
      <button @click='saveChanges' style='color:white;fontWeight:800;width:10%;overflow:hidden' class="btn btn-danger btn-sm">Save</button>
    <!--  --> 
  </div>
</template>

<script>
import db from './../../../../plugins/firebase'
export default {
  data() {
    return {
      profileKey:'',
      user:{

      },
      //personal
      phone:null,
      username:null,
      gender:null,
      statusrel:null,
      dob:null,
      //
      // description
      description:null,
      // education
      education: {
        title:'',
        from:'',
        to:'',
        website:''
      },
      // employment
      employment: {
        title:'',
        from:'',
        to:'',
        website:''
      }
    }
  },
  methods: {
    saveChanges() {
      if (this.phone!=null && this.phone.trim()!='' &&
       this.username!=null && this.username.trim()!='' &&
       this.gender!=null && this.statusrel!=null && this.dob!=null 
       ) 
      {
        if (this.phone !=this.user.phone || this.username!=this.user.username || this.gender!=this.user.gender||this.statusrel!=this.user.statusrel || this.dob!=this.user.dob) {
        this.$router.push({name:'about',params:{key:this.$store.state.ukey}})
        this.$store.dispatch('loading')
        db.ref('usersInformation').child(this.$store.state.ukey).child('username').set(this.username)
        .then(()=>{
          this.$store.dispatch('unload')
          this.$bvToast.show('edit')
        }).catch(()=>this.$store.dispatch('unload'))
        this.$store.dispatch('setUsername',this.username)
        db.ref('usersInformation').child(this.$store.state.ukey).child('phone').set(this.phone)
        .then(()=>{
          this.$store.dispatch('unload')
          this.$bvToast.show('edit')
        }).catch(()=>this.$store.dispatch('unload'))
        db.ref('usersInformation').child(this.$store.state.ukey).child('dob').set(this.dob)
        .then(()=>{
          this.$store.dispatch('unload')
          this.$bvToast.show('edit')
        }).catch(()=>this.$store.dispatch('unload'))
        this.$store.dispatch('setDob',this.dob)
        db.ref('usersInformation').child(this.$store.state.ukey).child('statusrel').set(this.statusrel)
        .then(()=>{
          this.$store.dispatch('unload')
          this.$bvToast.show('edit')
        }).catch(()=>this.$store.dispatch('unload'))
        db.ref('usersInformation').child(this.$store.state.ukey).child('gender').set(this.gender)
        .then(()=>{
          this.$store.dispatch('unload')
          this.$bvToast.show('edit')
        }).catch(()=>this.$store.dispatch('unload'))
        }
      }
      if (this.description!=null && this.description.trim()!='' && this.description!=this.user.description) {
        this.$store.dispatch('loading')
        db.ref('usersInformation').child(this.$store.state.ukey).child('description').set(this.description).then(()=> {
          this.$store.dispatch('unload')
          this.$router.push({name:'about',params:{key:this.$store.state.ukey}})
          this.$bvToast.show('edit')
        }).catch(()=> {
          this.$store.dispatch('unload')
        })
      }
      else {
        this.$bvToast.show('alert-no-change')
        return
      }
    },
    addNewEducation() {
      if (this.education.title !=null && this.education.title.trim()!='' &&
        this.education.from !=null && this.education.from.trim()!='' &&
        this.education.to !=null && this.education.to.trim()!='' &&
        this.education.website !=null && this.education.website.trim()!='' 
      ) {
        this.$store.dispatch('loading')
        db.ref('usersInformation').child(this.$store.state.ukey).child('education').push(this.education).then(()=> {
          this.$store.dispatch('unload')
          this.$bvToast.show('edit')
        }).catch(()=> {
          this.$store.dispatch('loading')
        })
        this.education= {
          title:'',
          from:'',
          to:'',
          website:'',
        }
      }
      else {
        this.$bvToast.show('alert-no-change')
        return
      }
    },
    addNewEmployment() {
      if (this.employment.title !=null && this.employment.title.trim()!='' &&
        this.employment.from !=null && this.employment.from.trim()!='' &&
        this.employment.to !=null && this.employment.to.trim()!='' &&
        this.employment.website !=null && this.employment.website.trim()!='' 
      ) {
        this.$store.dispatch('loading')
        db.ref('usersInformation').child(this.$store.state.ukey).child('employment').push(this.employment)
        .then(()=> {
          this.$store.dispatch('unload')
          this.$bvToast.show('edit')
        }).catch(()=> {
          this.$store.dispatch('unload')
        })
        this.employment= {
          title:'',
          from:'',
          to:'',
          website:'',
        }
      }
      else {
        this.$bvToast.show('alert-no-change')
        return
      }
    }
  },
  watch: {
    user() {
      this.gender=this.user.gender
      this.statusrel=this.user.statusrel
      this.dob=this.user.dob
      this.phone=this.user.phone
      this.username=this.user.username
      this.statusrel=this.user.statusrel
      this.description=this.user.description
    }
  },
  mounted() {
    this.$rtdbBind('user',db.ref('usersInformation').child(this.$store.state.ukey))
  }
}
</script>

<style>
.personal-info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.personal-info .personal, .personal-info .about,.personal-info .education,.personal-info .employment{
    margin-bottom:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color: white;
    width: 100%;
}
/* personal */
.personal-info .personal div{
  border:none;
  padding:5px;
}
.personal-info h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
.personal .sec-1,.personal .sec-2,.personal .sec-3,.personal .sec-4 {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding:15px 0;
  width: 100%;
}
.personal .sec-1 div,.personal .sec-2 div,.personal .sec-3 div {
  width: 43%;
  display: flex;
  flex-direction: column;
}
.personal .sec-1 div *,.personal .sec-2 div *,.personal .sec-3 div *{
  width: 100%;
  height: 100%;
  padding:10px;
}
.edit-view span {
  font-size: 14px;
  font-weight: bolder;
}
.edit-view input, .edit-view select {
  font-size: 14px;
  outline:none;
  border:none;
  border:1px solid gainsboro;
}
.edit-view input:focus{
  border:1px solid orange;
}
.edit-view textarea {
  border-color: gainsboro;
}
.edit-view textarea:focus {
  outline: none !important;
  border-color: orange;
}
</style>