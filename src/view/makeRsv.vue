<template>
<a-page-header title = "预约维修系统" sub-title="预约维修">
  <template #extra>
    <a-button type="" @click="logout">注销</a-button>
    </template>
</a-page-header>
  <div class="page">
    <a-table :dataSource="sessions" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.title == 'operation'">
          <a-button type="" @click="reserve(record.sesID)">预约</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import router from "../router"
import { useStore } from "vuex";
export default defineComponent({
  props: {},
  setup() {
    const store = useStore()
    //data
    const sessions = ref([
      {
        sesID: "abc",
        date: "2021-4-6",
        startTime: "19:00",
        endTime: "21:00",
        position: "浑南",
        limit: 100,
      },
    ]);
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
        datatIndex: "startTime",
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
    ];

    //method
    const reserve = (sesID) =>{
        router.push("/user/rsvForm?sesID="+sesID)
    }
    const logout = ()=>{
      store.commit("setUserAuth","")
      router.push("/user/login")
    }

    return {
      sessions,
      columns,
      reserve,
      logout,
    };
  },
});
</script>