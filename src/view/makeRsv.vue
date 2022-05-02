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
          <a-button type="" @click="reserve(record.sesID, record.position)"
            >预约</a-button
          >
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
          <a-button type="" @click="cancelRsv(record.id)">取消</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import router from "../router";
import { useStore } from "vuex";
import useSessions from "../composables/useSessions";
import useReservations from "../composables/useReservations";
import { message } from "ant-design-vue";
export default defineComponent({
  props: {},
  setup() {
    const store = useStore();
    const token = store.state.userAuth;
    const baseUrl = process.env.VUE_APP_BASEURL;

    const logout = () => {
      store.commit("setUserAuth", "");
      store.commit("setUserInfo", {});
      router.push("/user/login");
    };

    //data
    const { sessions, sesColumns, getSes } = useSessions(
      { baseUrl, token },
      { logout, message }
    );
    const { reservations, rsvColumns, cancelRsv, ifAlreadyRsv } =
      useReservations({ baseUrl }, { message, getSes, router });

    //method
    const reserve = (sesID, position) => {
      router.push({ path: "/user/rsvForm", query: { sesID, position } });
    };

    return {
      ifAlreadyRsv,
      sessions,
      reservations,
      sesColumns,
      rsvColumns,
      reserve,
      logout,
      cancelRsv,
    };
  },
});
</script>