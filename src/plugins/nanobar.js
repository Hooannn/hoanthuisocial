import Nanobar from "nanobar";
import router from '../router/router'
const nanobar = new Nanobar({
    target: document.getElementById("body")
})
router.beforeEach((to,from,next)=> {
    nanobar.go(30)
    next()
})
router.afterEach(()=> {
    nanobar.go(100)
})
export default nanobar