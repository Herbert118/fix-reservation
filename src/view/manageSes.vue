<template>
  <a-page-header title="先锋维修预约系统" sub-title="管理预约">
    <template #extra>
      <a-button type="" @click="adminLogout">注销</a-button>
    </template>
  </a-page-header>
  <div class="page">
    <div class="btnArea">
      <a-button @click="handleAdd" type="primary">新建预约</a-button>
    </div>
    <a-table bordered :data-source="sessions" :columns="sesColumns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'op'">
          <a-popconfirm v-if="sessions.length" title="确定删除吗?" @confirm="deleteSes(record.sesID)">
            <a-button type="">删除</a-button>
          </a-popconfirm>
        </template>
        <template v-if="column.dataIndex === 'op2'">
          <a-button @click="viewRsvInSes(record.sesID)">查看</a-button>
        </template>
      </template>
    </a-table>

  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue"
import { message } from "ant-design-vue"
import useSessions from "@/composables/useSessions"
import useAdminAuth from "@/composables/useAdminAuth"
export default defineComponent({
  props: {},
  setup() {
    const { adminToken, adminLogout } = useAdminAuth({},{message})
    const token = adminToken
    const logout = adminLogout
    //useSessions
    const info = { token }
    const depend = { logout, message }
    const { sessions, sesColumns, getSes, deleteSes, handleAdd, viewRsvInSes } = useSessions(
      info,
      depend
    )

    

    onMounted(getSes)

    return {
      sessions,
      sesColumns,
      getSes,
      deleteSes,
      handleAdd,
      adminLogout,
      viewRsvInSes
    }
  },
})
</script>

<style scoped>
div.btnArea {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: calc(2vh) calc(4vw) calc(3vh) 0;
}

.ant-btn-primary {
  width: calc(12vw)
}

@media screen and (max-width:650px) {
  .ant-btn-primary {
    width: calc(15vw)
  }

}
</style>
