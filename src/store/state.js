const state = {
  user: null,
  error: null,
  success: null,
  status:null,
  role: null,
  type:null,
  ukey:null,
  username:null,
  avatarImg:null,
  dob:null,
  userstatus:null,
  coverImg:null,
  location:null,
  unseenNoti:null,
  unseenMessage:0,
  currentContact:0,
  messagetheme:{
    name:"",
    color:'',
    bgColor:''
  },
  apptheme:{
    name:"Sea",
    bgColor:"rgba(229, 240, 248, 0.904)",
    color:"black"
  },
  messagesData:[],
  postsData:[],
  filterPosts:[],
  callComing:{},
  getMyVideo:false,
  getContactVideo:false,
  myVideo:{},
  contactVideo:{},
  connection:false
};
export default state;
