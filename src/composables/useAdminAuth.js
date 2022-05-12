import { reactive } from 'vue'
import axios from "axios"
import store from "../store"
import router from '../router'

export default function useAdminAuth(info, depend) {

  console.log(info)
  const { message } = depend

  //data
  const adminInfo = reactive({
    account: "",
    password: "",
  })

  const adminToken = store.state.adminAuth;

  
  //method


  


  const adminLogin = () => {
    const url = `${process.env.VUE_APP_BASEURL}/api/adminLogin`
    const payload = {
      ...adminInfo
    }

    for(let prop in payload){
      if(payload[prop] === null||payload[prop] === ''){
        message.warn("请将表单填写完整!")
        return
      }
    }

    axios
      .post(url, payload, {

      })
      .then((res) => {
        store.commit("setAdminAuth", res.data.token)
        router.push("/admin/manageSes")
      })
      .catch((e) => {
        console.warn(e)
        message.warn("登录失败")
      })
  }

  const adminLogout = () => {
    store.commit("setAdminAuth", "")
    router.push("/admin/login")
  }

  //used in router
  const checkAdminAuth = () => {
    const baseUrl = `${process.env.VUE_APP_BASEURL}`
    const token = store.state.adminAuth
    const url = baseUrl + "/api/ses"
    axios
      .get(url, {
        headers: {
          Authorization: `${token}`
        },
      })
      .then((res) => {
        console.log(res.data)
        router.push("/admin/manageSes")
      })
      .catch((e) => {
        console.warn(e.response)
        if (e.response.status == 401) {
          adminLogout()
        }
      })
  }

  const ifAdminTokenStored = () => {
    if (!store.state.adminAuth) {
      router.push("/admin/login")
    }
  }

  return {
    adminInfo,
    adminToken,

    adminLogout,
    adminLogin,
    checkAdminAuth,
    ifAdminTokenStored
  }

}