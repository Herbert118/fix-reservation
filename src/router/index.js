import {createRouter,createWebHistory} from "vue-router"
import adminLogin from "../view/adminLogin.vue"
import userLogin from "../view/userLogin.vue"
import manageSes from "../view/manageSes.vue"
import makeRsv from "../view/makeRsv.vue"
import rsvForm from "../view/rsvForm.vue"
import sesForm from "../view/sesForm.vue"
import store from "../store"
import userAuth from "../view/userAuth.vue"

const ifAdminAuthed = ()=>{
    if(!store.state.adminAuth){
        router.push("/admin/login");
    }
}

const ifUserAuthed =()=>{
    if(!store.state.userAuth){
        router.push("/user/login")
    }
}

const routes = [
    {
        "path":"/admin/login",
        "name":"adminLogin",
        "component":adminLogin
    },
    
    {
        "path":"/user/login",
        "name":"userLogin",
        "component":userLogin,
        "beforeEnter":()=>{
            if(store.state.userAuth){
                router.push("/user/makeRsv")
            }
        }
    },
    {
        "path":"/user/auth",
        "name":"userAuth",
        "component":userAuth,
        "beforeEnter":()=>{
            if(store.state.userAuth){
                router.push("/user/makeRsv")
            }
        }
    },
    {
        "path":"/admin/manageSes",
        "name":"manageSes",
        "component":manageSes,
        "beforeEnter":ifAdminAuthed
    },
    {
        "path":"/user/makeRsv",
        "name":"makeRsv",
        "component":makeRsv,
        "beforeEnter":ifUserAuthed
    },
    {
        "path":"/user/rsvForm",
        "name":"rsvForm",
        "component":rsvForm,
        "beforeEnter":ifUserAuthed
    },
    {
        "path":"/admin/sesForm",
        "name":"sesForm",
        "component":sesForm,
        "beforeEnter":ifAdminAuthed
    },
    {
        "path":"/",
        "redirect":"/user/login"
    },
    {
        "path":"/admin",
        "redirect":"/admin/login"
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



export default router;