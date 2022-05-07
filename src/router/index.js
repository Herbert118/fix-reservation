import {
    createRouter,
    createWebHistory
} from "vue-router"
import adminLogin from "@/view/adminLogin.vue"
import userLogin from "@/view/userLogin.vue"
import manageSes from "@/view/manageSes.vue"
import makeRsv from "@/view/makeRsv.vue"
import rsvForm from "@/view/rsvForm.vue"
import sesForm from "@/view/sesForm.vue"
import userAuth from "@/view/userAuth.vue"
import useUserAuth from "@/composables/useUserAuth"
import useAdminAuth from "@/composables/useAdminAuth"



const {checkAdminAuth, ifAdminTokenStored} = useAdminAuth({},{undefined})

const { checkUserAuth, ifUserTokenStored } = useUserAuth({}, { undefined })

const routes = [{
    "path": "/admin/login",
    "name": "adminLogin",
    "component": adminLogin,
    "beforeEnter": checkAdminAuth
},

{
    "path": "/user/login",
    "name": "userLogin",
    "component": userLogin,
    "beforeEnter": checkUserAuth
},
{
    "path": "/user/auth",
    "name": "userAuth",
    "component": userAuth,
},
{
    "path": "/admin/manageSes",
    "name": "manageSes",
    "component": manageSes,
    "beforeEnter": ifAdminTokenStored
},
{
    "path": "/user/makeRsv",
    "name": "makeRsv",
    "component": makeRsv,
    "beforeEnter": ifUserTokenStored
},
{
    "path": "/user/rsvForm",
    "name": "rsvForm",
    "component": rsvForm,
    "beforeEnter": ifUserTokenStored
},
{
    "path": "/admin/sesForm",
    "name": "sesForm",
    "component": sesForm,
    "beforeEnter": ifAdminTokenStored
},
{
    "path": "/",
    "redirect": "/user/login"
},
{
    "path": "/admin",
    "redirect": "/admin/login"
}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



export default router;