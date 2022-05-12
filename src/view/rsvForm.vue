
<template>
  <a-page-header title="先锋维修预约系统" sub-title="填写预约信息" @back="() => $router.push('/user/makeRsv')">
    <template #extra>
      <a-button type="" @click="userLogout">注销</a-button>
    </template>
  </a-page-header>
  <div class="narrPage">
    <div class="formBox">
      <div class="formArea">

        <a-row>
          <a-col :span="24">
            <a-input v-model:value="rsvInfo.model" placeholder="电脑型号" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-textarea v-model:value="rsvInfo.question" placeholder="遇到的问题或者需要的服务"></a-textarea>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-button type="primary" @click="submitRsv" block>提交</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
   

<script>
import { defineComponent } from "vue"
import { message } from "ant-design-vue"
import useUserAuth from "@/composables/useUserAuth"
import useReservations from "@/composables/useReservations"
export default defineComponent({
  props: {},
  setup() {

    const { userLogout, userToken } = useUserAuth({}, { message });
    const token = userToken
    const { rsvInfo, submitRsv } = useReservations(
      { token },
      { message, undefined }
    )


    //return
    return {
      rsvInfo,
      submitRsv,
      userLogout,
    }
  },
})
</script>
