
<template>
  <a-page-header title="先锋维修预约系统" sub-title="填写场次信息" @back="() => $router.push('/admin/manageSes')">
    <template #extra>
      <a-button type="" @click="adminLogout">注销</a-button>
    </template>
  </a-page-header>
  <div class="narrPage">
    <div class="formBox">
      <div class="formArea">
        <a-row>
          <a-col :span="24">
            <a-input v-model:value="sesInfo.limit" type="number" placeholder="人数限制"></a-input>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-select ref="select" v-model:value="sesInfo.position" :options="positionOptions" block></a-select>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-date-picker v-model:value="sesInfo.date" :placeholder="'日期'" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-time-range-picker v-model:value="sesInfo.time" :valueFormat="'HH:mm:ss'" :placeholder='["开始", "结束"]' />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-button type="primary" @click="postSes" block>提交</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
   

<script>
import { defineComponent } from "vue"

import { message } from "ant-design-vue"

import useSessions from "@/composables/useSessions"
import useAdminAuth from "@/composables/useAdminAuth"
export default defineComponent({
  props: {},
  setup() {




    const { adminLogout, adminToken } = useAdminAuth({}, { message })
    const logout = adminLogout
    const token = adminToken
    //useSessions

    const info = { token }
    const depend = { logout, message }
    const { sesInfo, postSes, dateFormat, positionOptions } = useSessions(info, depend)


    return {
      sesInfo,

      postSes,
      adminLogout,

      positionOptions,
      dateFormat,
    }
  },
})
</script>

<style scoped>
@import "../assets/css/stylesheet.css"
</style>