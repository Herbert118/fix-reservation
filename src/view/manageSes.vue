<template>
  <a-page-header title="预约维修系统" sub-title="管理预约">
    <template #extra>
      <a-button type="" @click="logout">注销</a-button>
    </template>
  </a-page-header>
  <div class="page">
    <div class="btnArea">
      <a-button style="margin-bottom: 8pxwidth:100px"
       @click="handleAdd" type="primary"
        >Add
      </a-button>

      <a-table bordered :data-source="sessions" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-popconfirm
              v-if="sessions.length"
              title="Sure to delete?"
              @confirm="onDelete(record.sesID)"
            >
              <a-button type="">Delete</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
import { useStore } from "vuex"
import { message } from "ant-design-vue"
import axios from "axios"
import router from "../router"
export default defineComponent({
  props: {},
  setup() {
    const store = useStore()
    const token = store.state.adminAuth
    const baseUrl = process.env.VUE_APP_BASEURL
    //data
    const sessions = ref([])

    const columns = [
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
      },
    ]

    const onDelete = (sesID) => {
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

    const handleAdd = () => {
      router.push("/admin/sesForm")
    }
    const logout = () => {
      store.commit("setAdminAuth", "")
      router.push("/admin/login")
    }
    const getSes = ()=>{
       const url = baseUrl + "/api/ses"
      axios
        .get(url,{
          headers:{
          Authorization:`${token}`
        },
        })
        .then((res) => {
          //sessions.value = res.data.sessions //this may be changed
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
    //hook
    onMounted(() => {
      getSes()
    })
    return {
      sessions,
      columns,
      onDelete,
      handleAdd,
      logout,
    }
  },
})
</script>

<style scoped>
div.btnArea {
  display: flex;
  flex-direction: column;
  justify-content: flex-end
}
</style>
