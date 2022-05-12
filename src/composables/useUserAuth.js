import { reactive } from 'vue'
import axios from "axios"
import store from "../store"
import router from '../router'
export default function useUserAuth(info, depend) {
  const { message } = depend
  console.log(info)

  //data
  const userFormData = reactive({
    stuEmail: "20206824@stu.neu.edu.cn",
  })

  const userToken = store.state.userAuth

  const userInfo = store.state.userInfo
  //method
  const userLogin = () => {
    const url = `${process.env.VUE_APP_BASEURL}/api/userLogin`
    const payload = {
      email: userFormData.stuEmail,
    }

    if(!userFormData.stuEmail.match("^\\d{8}@stu\\.neu\\.edu\\.cn$")){
      message.warn("邮箱格式错误");
      return;
    }

    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000
      })
      .then((res) => {
        if (res.data.msg === "success") {
          message.info("邮件已发送")
        }
        else {
          message.warn("邮件发送失败")
        }

      })
      .catch((e) => {
        console.log(e)
        message.warn("邮件发送失败")
      })
  }

  const userAuth = () => {
    let token = router.currentRoute.value.query.token
    if (token) {
      const url = `${process.env.VUE_APP_BASEURL}/api/userAuth`
      axios
        .get(url, {
          headers: {
            Authorization: `${token}`
          }
        })
        .then((res) => {
          store.commit("setUserAuth", router.currentRoute.value.query.token);
          store.commit("setUserInfo", { userID: `${res.data.id}`, userEmail: `${res.data.email}` })
          router.push("/user/makeRsv")
        })
        .catch((e) => {
          message.warn("error:user Auth fail")
          console.warn(e)
        })

    }
  }

  const checkUserAuth = () => {
    const token = store.state.userAuth
    const url = `${process.env.VUE_APP_BASEURL}/api/userAuth`
    axios
      .get(url, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(() => {
        //200 时 已成功
        router.push("/user/makeRsv")
      })
      .catch((e) => {
        console.log(e)
      })
  }



  const ifUserTokenStored = () => {
    if (!store.state.userAuth) {
      router.push("/user/login")
    }
  }
  const userLogout = () => {
    store.commit("setUserAuth", "");
    store.commit("setUserInfo", {});
    router.push("/user/login");
  };
  


  return {
    userToken,
    userInfo,

    userFormData,
    userAuth,
    userLogin,
    checkUserAuth,
    ifUserTokenStored,
    userLogout
  }
}