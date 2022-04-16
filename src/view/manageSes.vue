<template>
<a-page-header title = "预约维修系统" sub-title="管理预约">
  <template #extra>
    <a-button type="" @click="logout">注销</a-button>
    </template>
</a-page-header>
  <div class="page">
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="handleAdd"
      >Add</a-button
    >
    <a-table bordered :data-source="sessions" :columns="columns">
      <template #bodyCell="{ column,  record }">
        

        <template v-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="sessions.length"
            title="Sure to delete?"
            @confirm="onDelete(record.key)"
          >
            <a-button type="">Delete</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref, } from "vue";
import router from "../router"
import store from "../store"
export default defineComponent({
  props: {},
  setup() {
    //data
    const sessions = ref([
      {
        sesID: "0",
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
      },{
        title:"operation",
        dataIndex:"operation"
      }
    ];

    //method
    const onMounted = () => {
        //get sessions
    };
    const onDelete = (key) => {
      sessions.value = sessions.value.filter((item) => item.key !== key);
    };

    const handleAdd = () => {
      router.push("/admin/sesForm")
    };
    const logout = ()=>{
      store.commit("setAdminAuth","")
      router.push("/admin/login")
    }

    return {
      sessions,
      columns,
      onMounted,
      onDelete,
      handleAdd,
     logout,
    };
  },
});
</script>
