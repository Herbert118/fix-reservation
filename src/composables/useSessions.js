import { ref, onMounted, reactive } from 'vue'
import axios from "axios"
import dayjs from 'dayjs';

export default function useSessions(info, depend) {
  const baseUrl = process.env.VUE_APP_BASEURL;
  const {  token } = info;
  const { logout, message } = depend;

  //data
  const positionArr = ['null','浑南','南湖']
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
    width:'15%',
  },
  {
    title: "日期",
    dataIndex: "date",
    width:'20%',
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
    width:'20%',
  },
  {
    title: "结束时间",
    dataIndex: "endTime",
    width:'20%',
  },
  {
    title: "位置",
    dataIndex: "positionText",
  },
  {
    title: "人数限制",
    dataIndex: "limit",
  },
  {
    title: "operation",
    dataIndex: "operation",
  },{
    title: "operation2",
    dataIndex: "operation2",
  }
]);

  //method
  const postSes = () => {
    const url = baseUrl + "/api/ses"
    const payload = {
      limit: sesInfo.limit,
      position: sesInfo.position,
      date: sesInfo.date.format(dateFormat),
      startTime: sesInfo.time[0],
      endTime: sesInfo.time[1],

    }
    axios
      .post(url, payload, {
        headers: {
          Authorization: `${token}`
        }

      })
      .then((res) => {
        message.info(res.data.msg)
      })
      .catch((e) => {
        message.warn("提交失败")
        console.log(e)
      })
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