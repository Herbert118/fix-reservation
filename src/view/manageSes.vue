<template>
  <a-page-header title="预约维修系统" sub-title="管理预约">
    <template #extra>
      <a-button type="" @click="logout">注销</a-button>
    </template>
  </a-page-header>
  <div class="page">
    <div class="btnArea">
      <a-button
        style="margin-bottom: 8pxwidth:100px"
        @click="handleAdd"
        type="primary"
        >Add
      </a-button>

      <a-table bordered :data-source="sessions" :columns="sesColumns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-popconfirm
              v-if="sessions.length"
              title="Sure to delete?"
              @confirm="deleteSes(record.sesID)"
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
    const baseUrl = process.env.VUE_APP_BASEURL;
    const router = useRouter();

    const logout = () => {
      store.commit("setAdminAuth", "");
      router.push("/admin/login");
    };

    //useSessions
    const info = { baseUrl, token };
    const depend = { logout, message };
    const {
      sessions,
      sesColumns,
      getSes,
      deleteSes,
    } = useSessions(info, depend);

    const handleAdd = () => {
      router.push("/admin/sesForm");
    };

    return {
      sessions,
      sesColumns,
      getSes,
      deleteSes,
      handleAdd,
      logout,
    };
  },
});
</script>

<style scoped>
div.btnArea {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
