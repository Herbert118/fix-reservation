<template>
  <a-page-header title="预约维修系统" sub-title="预约维修">
    <template #extra>
      <a-button type="" @click="logout">注销</a-button>
    </template>
  </a-page-header>
  <div class="page">
    <a-table :dataSource="sessions" :columns="sesColumns" v-if="!ifAlreadyRsv">
      <template #bodyCell="{ column, record }">
        <template v-if="column.title == 'operation'">
          <a-button type="" @click="reserve(record.startTime)">预约</a-button>
        </template>
      </template>
    </a-table>

    <a-table
      :dataSource="reservations"
      :columns="rsvColumns"
      v-if="ifAlreadyRsv"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.title == 'operation'">
          <a-button type="" @click="cancel(record.rsvID)">取消</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
import router from "../router"
import { useStore } from "vuex"
import axios from "axios"
import { message } from "ant-design-vue"
import configs from "../config"
export default defineComponent({
  props: {},
  setup() {
    const store = useStore()
    const token = store.state.userAuth
    const baseUrl = process.env.VUE_APP_BASEURL
    //data
    let ifAlreadyRsv = ref(false)
    let sessions = ref([])
    let reservations = ref([])
    const sesColumns = [
      {
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
        title: "position_type",
        dataIndex: "position_type",
      },
      {
        title: "limit",
        dataIndex: "limit",
      },
      {
        title: "operation",
        dataIndex: "operation",
      },
    ]

    const rsvColumns = [
      {
        title: "rsvID",
        dataIndex: "rsvID",
      },
      {
        title: "model",
        dataIndex: "model",
      },
      {
        title: "question",
        dataIndex: "question",
      },
    ]

    //method
    const reserve = (sesID) => {
      console.log(sesID)
      //router.push("/user/rsvForm?sesID=" + sesID)
    }
    const cancel = (sesID) => {
      const url = baseUrl + "/api/rsv"
      axios.delete(url, {
        headers: {
          Authorization: token,
        },
        data: {
          sesID,
        },
      })
    }
    const logout = () => {
      store.commit("setUserAuth", "")
      router.push("/user/login")
    }
    //hook
    onMounted(() => {
      const url = baseUrl + "/api/ses"
      const now = new Date()
      axios
        .get(url, {
          headers: {
            Authorization: `${token}`,
          },
          params:{
            fromTime:`${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`,
          }
        })
        .then((res) => {
          //sessions.value = res.data.sessions
          sessions.value = res.data
          sessions.value.position = configs.positions[res.data.position_type]
          console.log(sessions.value)
        })
        .catch((e) => {
          console.log(e)
          message.warn("error")
        })

      const url2 = baseUrl + "/api/rsv"
      const email = store.state.userInfo.userEmail
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
          console.log(res.data)
         // if (res.data.reservations) { //may be changed
            if(res.data){
            ifAlreadyRsv.value = true
            //reservations.value = res.data.reservations
            reservations.value = res.data
          } else {
            ifAlreadyRsv.value = false
          }
          console.log(ifAlreadyRsv)
        })
        .catch((e) => {
          message.warn("rsv error")
          console.log(e)
        })
    })

    return {
      ifAlreadyRsv,
      sessions,
      reservations,
      sesColumns,
      rsvColumns,
      reserve,
      logout,
      cancel,
    }
  },
})
</script>