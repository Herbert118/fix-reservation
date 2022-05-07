<template>
  <a-page-header title="预约维修系统" sub-title="管理预约">
    <template #extra>
      <a-button type="" @click="logout">注销</a-button>
    </template>
  </a-page-header>
  <div class="page">
    <div class="btnArea">
      <a-button @click="handleAdd" type="primary">新建预约</a-button>
    </div>
    <a-table bordered :data-source="sessions" :columns="sesColumns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-popconfirm v-if="sessions.length" title="Sure to delete?" @confirm="deleteSes(record.sesID)">
            <a-button type="">Delete</a-button>
          </a-popconfirm>
        </template>
        <template v-if="column.dataIndex === 'operation2'">
            <a-button @click="viewRsvInSes(record.sesID)">查看预约</a-button>
        </template>
      </template>
    </a-table>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import useSessions from "@/composables/useSessions";
export default defineComponent({
  props: {},
  setup() {
    const store = useStore();
    const token = store.state.adminAuth;
    const router = useRouter();

    const logout = () => {
      store.commit("setAdminAuth", "");
      router.push("/admin/login");
    };

    //useSessions
    const info = {  token };
    const depend = { logout, message };
    const { sessions, sesColumns, getSes, deleteSes } = useSessions(
      info,
      depend
    );

    const handleAdd = () => {
      router.push("/admin/sesForm");
    };

    const viewRsvInSes = (sesID) =>{
      router.push({ path: "/admin/rsvTable", query: { sesID} })
    }

    return {
      sessions,
      sesColumns,
      getSes,
      deleteSes,
      handleAdd,
      logout,
      viewRsvInSes
    };
  },
});
</script>

<style scoped>
div.btnArea {
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: calc(2vh) calc(4vw) calc(3vh) 0;
}
.ant-btn-primary{
  width:calc(7vw)
}
</style>
