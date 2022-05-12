<template>
  <a-page-header title="先锋维修预约系统" sub-title="预约维修">
    <template #extra>
      <a-button type="" @click="userLogout">注销</a-button>
    </template>
  </a-page-header>
  <div class="page">
     <a-alert
    :description="infoText"
    type="info"
    show-icon
  />
  <br>
    <a-table class="sesTable" :dataSource="sessions" :columns="sesColumns" v-if="!ifAlreadyRsv">
      <template #bodyCell="{ column, record }">
        <template v-if="column.title == 'op'">
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
          <a-popconfirm v-if="reservations.length" title="确定取消吗?" @confirm="cancelRsv(record.id)">
            <a-button type="">取消</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue"
import useUserAuth from "@/composables/useUserAuth"
import useSessions from "../composables/useSessions"
import useReservations from "../composables/useReservations"
import { message } from "ant-design-vue"
export default defineComponent({
  props: {},
  setup() {

  const {userLogout, userToken} =  useUserAuth({},{message})
  const logout = userLogout
  const token = userToken
    //data
    const { sessions, sesColumns, getSes } = useSessions(
      {  token },
      { logout, message }
    )

    sesColumns.pop()//operation2

    const { reservations, rsvColumns, cancelRsv, ifAlreadyRsv,getRsvByEmail, infoText, reserve } =
      useReservations({token }, { message, getSes})

  
    

    onMounted(getRsvByEmail)
    onMounted(getSes)

    return {
      ifAlreadyRsv,
      sessions,
      reservations,
      sesColumns,
      rsvColumns,
      infoText,
      reserve,
      userLogout,
      cancelRsv,
      
    }
  },
})
</script>
