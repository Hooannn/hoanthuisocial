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
    bgColor:"linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)",
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
  connection:false,
  file:null,
};
export default state;
