import { ref, reactive } from 'vue'
import axios from "axios"
import dayjs from 'dayjs';
import router from '@/router';

export default function useSessions(info, depend) {
  const baseUrl = process.env.VUE_APP_BASEURL;
  const {  token } = info;
  const { logout, message } = depend;

  //data
  const positionArr = ['null','浑南','南湖']
  const positionOptions = ref([
    {
      value: "1",
      label: "浑南校区",
    },
    {
      value: "2",
      label: "南湖校区",
    },
  ])
  const dateFormat = "YYYY-MM-DD"
  const sessions = ref([]);
  const sesInfo = reactive({

    limit: "",
    position: "",
    date: dayjs(),
    time: []
  });
  const sesColumns = reactive([{
    title: "场次ID",
    dataIndex: "sesID",
    width:'10%',
  },
  {
    title: "日期",
    dataIndex: "date",
    width:'20%',
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
    width:'18%',
  },
  {
    title: "结束时间",
    dataIndex: "endTime",
    width:'18%',
  },
  {
    title: "位置",
    dataIndex: "positionText",
    width:"10%"
  },
  {
    title: "人数限制",
    dataIndex: "limit",
  },{
    title:"已预约",
    dataIndex:"num",
  },
  {
    title: "op",
    dataIndex: "op",
  },{
    title: "op2",
    dataIndex: "op2",
  }
]);

  //method

  const handleAdd = () => {
    router.push("/admin/sesForm")
  }

  const postSes = () => {
    const url = baseUrl + "/api/ses"
    const payload = {
      limit: sesInfo.limit,
      position: sesInfo.position,
      date: sesInfo.date.format(dateFormat),
      startTime: sesInfo.time[0],
      endTime: sesInfo.time[1],
    }

    for(let prop in payload){
      if(payload[prop] === null||payload[prop] === ''){
        message.warn("请将表单填写完整!");
        return;
      }
    }

    axios
      .post(url, payload, {
        headers: {
          Authorization: `${token}`
        }

      })
      .then((res) => {
        message.info(res.data.msg)
        router.push("/admin/manageSes")
      })
      .catch((e) => {
        message.warn("提交失败")
        console.log(e)
      })
  }

  const viewRsvInSes = (sesID) => {
    router.push({ path: "/admin/rsvTable", query: { sesID } })
  }


  const getSes = () => {
    const url = baseUrl + "/api/ses"
    axios
      .get(url, {
        headers: {
          Authorization: `${token}`
        },
      })
      .then((res) => {
        sessions.value = res.data
       
       for(let i = 0; i<sessions.value.length;i++ ){
         sessions.value[i].positionText = positionArr[sessions.value[i].position];
       }//change to text
      })
      .catch((e) => {
        message.warn(e)
        if (e.response.status == 401) {
          logout()
        }
      })

  }

  const deleteSes = (sesID) => {
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
        message.warn("删除失败")
      })
  }

  

  
  

  return {
    sessions,
    sesInfo,
    sesColumns,
    positionOptions,
    postSes,
    getSes,
    deleteSes,
    handleAdd,
    viewRsvInSes


  }
}