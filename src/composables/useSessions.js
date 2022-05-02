import { ref, onMounted, reactive } from 'vue'
import axios from "axios"
import dayjs from 'dayjs';

export default function useSessions(info, depend){
    const {baseUrl,token} = info;
    const {logout, message} = depend;

    //data
    const dateFormat = "YYYY-MM-DD"
    const sessions = ref([]);
    const sesInfo = reactive({
      
        limit: "",
        position: "",
        date:dayjs(),
        time:[]
      });
    const sesColumns = reactive([{
        title: "sesID",
        dataIndex: "sesID",
      },
      {
        title: "date",
        dataIndex: "date",
      },
      {
        title: "startTime",
        dataIndex: "startTime",
      },
      {
        title: "endTime",
        dataIndex: "endTime",
      },
      {
        title: "position",
        dataIndex: "position",
      },
      {
        title: "limit",
        dataIndex: "limit",
      },
      {
        title: "operation",
        dataIndex: "operation",
      },]);

      //method
    const postSes = () =>{
      const url = baseUrl + "/api/ses"
      const payload = {
        limit:sesInfo.limit,
        position:sesInfo.position,
        date:sesInfo.date.format(dateFormat),
        startTime:sesInfo.time[0],
        endTime:sesInfo.time[1],

      }
      axios
      .post(url,payload,{
        headers:{
          Authorization:`${token}`
        }
        
      })
      .then((res)=>{
        message.info(res.data.msg)
      })
      .catch((e)=>{
        message.warn("提交失败")
        console.log(e)
      })
    }
    const getSes = () =>{
        const url = baseUrl + "/api/ses"
        axios
          .get(url,{
            headers:{
            Authorization:`${token}`
          },
          })
          .then((res) => {
            sessions.value = res.data
            console.log(sessions.value)
          })
          .catch((e) => {
            message.warn(e.response.data.msg)
            if(e.response.status == 401){
              logout()
            }
          })

    }
    const deleteSes = (sesID) =>{
        const url = baseUrl + "/api/ses"
        axios
          .delete(url, {
            headers: {
              Authorization: `${token}`,
            },
            data: {
              sesID,
            },
          })
          .then((res) => {
            message.info(res.data.msg)
            getSes()
          })
          .catch(() => {
            message.warn("delete fail")
          })
    }

    onMounted(getSes);

    return {
        sessions,
        sesInfo,
        sesColumns,
        postSes,
        getSes,
        deleteSes,


    }
}