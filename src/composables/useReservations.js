import { ref, onMounted, reactive } from 'vue'
import axios from "axios"
import store from "../store"

export default function useReservations(info, depend){
    const { baseUrl} = info;
    const {message, getSes, router } = depend;
    const token = store.state.userAuth;
    //data
    const rsvInfo = reactive({
        model: "",
        question: "",
      });
    const ifAlreadyRsv = ref(false)
    const reservations = ref([])
    
    const rsvColumns = [
        {
          title: "rsvID",
          dataIndex: "id",
        },
        {
          title: "model",
          dataIndex: "model",
        },
        {
          title: "question",
          dataIndex: "question",
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
            message.info("cancelRsv success");
            getSes();
            getRsv();
          } else [message.warn("cancel fail")];
        })
        .catch((e) => {
          console.log(e);
          message.warn("cancel fail");
        });
    };

    const getRsv = () => {
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
            console.log(res.data);
            // if (res.data.reservations) { //may be changed
            if (res.data.length) {
              ifAlreadyRsv.value = true;
              //reservations.value = res.data.reservations
              reservations.value = res.data;
            } else {
              ifAlreadyRsv.value = false;
            }
            console.log(ifAlreadyRsv);
          })
          .catch((e) => {
            message.warn("rsv error");
            console.log(e);
          });
      };

      const submitRsv = () => {
        const url = baseUrl+"/api/rsv"
        const sesID = router.currentRoute.value.query.sesID
        const position = router.currentRoute.value.query.position
        const token=store.state.userAuth
        const userID = store.state.userInfo.userID
        console.log(router.currentRoute.value.query)
        const payload = {
          ...rsvInfo,
          sesID,
          userID,
          position
        }
        axios
        .post(url,payload,{
          headers:{
            Authorization:`${token}`
          }
        })
        .then((res)=>{
          message.info(res.data.msg)
          router.push("/user/makeRsv")
        })
        .catch((e)=>{
          message.warning(e)
        })
        
      };
  


      onMounted(getRsv);
  
    return {
        ifAlreadyRsv,
        reservations,
        rsvInfo,
        getRsv,
        cancelRsv,
        rsvColumns,
        submitRsv
        

    }
}