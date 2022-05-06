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

  //method


  const logout = () => {
    store.commit("setAdminAuth", "");
    router.push("/admin/login");
  };


  const adminLogin = () => {
    const url = `${process.env.VUE_APP_BASEURL}/api/adminLogin`
    const payload = {
      ...adminInfo
    }

    axios
      .post(url, payload, {

      })
      .then((res) => {
        store.commit("setAdminAuth", res.data.token)
        router.push("/admin/manageSes")
      })
      .catch((e) => {
        console.log(e)
        message.warning("登录失败")
      })
  }

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
        console.warn(e.response.data.msg)
        if (e.response.status == 401) {
          logout()
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
    adminLogin,
    checkAdminAuth,
    ifAdminTokenStored

  }

}