import { ref, reactive } from 'vue'
import axios from "axios"
import { useStore } from 'vuex';
import router from "../router"
export default function useReservations(info, depend) {
  const store = useStore()
  const baseUrl = process.env.VUE_APP_BASEURL;
  const { token } = info;
  const { message, getSes } = depend;
  //data
  const rsvInfo = reactive({
    model: "",
    question: "",
  });
  const ifAlreadyRsv = ref(false)
  const reservations = ref([])
  let infoText = ref('')
  const rsvColumns = [
    {
      title: "预约ID",
      dataIndex: "id",
      width:"12%"
    },
    {
      title: "型号",
      dataIndex: "model",
      width:"20%"
    },
    {
      title: "问题",
      dataIndex: "question",
      width:"60%"
    },
    {
      title: "operation",
      dataIndex: "operation",
    },
  ];
  //method
  const cancelRsv = (rsvID) => {
    const url = baseUrl + "/api/rsv";
    axios
      .delete(url, {
        headers: {
          Authorization: `${token}`,
        },
        data: {
          rsvID,
        },
      })
      .then((res) => {
        if (res.data.msg === "success") {
          message.info("取消成功");
          getSes();
          getRsvByEmail();
        } else {
          message.warn("取消失败")
        }
      })
      .catch((e) => {
        console.log(e);
        message.warn("cancel fail");
      });
  };

  const getRsvByEmail = () => {
    const url2 = baseUrl + "/api/rsv";
    const email = store.state.userInfo.userEmail;

    axios
      .get(url2, {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          email,
        },
      })
      .then((res) => {
        if (res.data.length) {
          ifAlreadyRsv.value = true;
          reservations.value = res.data;
          infoText.value = "请注意预约的时间, 及时到场哦"
        } else {
          ifAlreadyRsv.value = false;
          infoText.value = "请注意选择合适的时间和地点哦"
        }
      })
      .catch((e) => {
        message.warn("获取预约信息失败");
        console.log(e);
      });
  };


  const getRsvBySes = () => {
    const url2 = baseUrl + "/api/rsv"
    const sesID = router.currentRoute.value.query.sesID
    axios
      .get(url2, {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          sesID,
        },
      })
      .then((res) => {
        reservations.value = res.data;
      })
      .catch((e) => {
        message.warn("获取预约信息失败");
        console.log(e);
      });
  };

  const submitRsv = () => {
    const url = baseUrl + "/api/rsv"
    const sesID = router.currentRoute.value.query.sesID
    const position = router.currentRoute.value.query.position
    const token = store.state.userAuth
    const userID = store.state.userInfo.userID
    console.log(router.currentRoute.value.query)
    const payload = {
      ...rsvInfo,
      sesID,
      userID,
      position
    }
    axios
      .post(url, payload, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then((res) => {
        message.info(res.data.msg)
        router.push("/user/makeRsv")
      })
      .catch((e) => {
        message.warning("预约失败")
        console(e)
      })
  };

  return {
    ifAlreadyRsv,
    reservations,
    rsvInfo,
    rsvColumns,
    infoText,
    getRsvByEmail,
    cancelRsv,
    submitRsv,
    getRsvBySes
  }
}