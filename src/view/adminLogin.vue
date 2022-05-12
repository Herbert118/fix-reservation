
<template>
  <div class="container">
    <a-card title="先锋维修预约系统-管理员登录" :bordered="false">
      <div class="formArea">
        <a-row>
          <a-col :span="24">
            <a-input v-model:value="adminInfo.account" placeholder="管理员账号" />
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-input-password v-model:value="adminInfo.password" placeholder="密码" />
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-button type="primary" @click="adminLogin()" block>登录</a-button>
          </a-col>
        </a-row>


      </div>
    </a-card>
  </div>
</template>
   

<script>
import { defineComponent } from "vue"
import { message } from "ant-design-vue"
import useAdminAuth from "../composables/useAdminAuth"
export default defineComponent({
  props: {},
  setup() {
    const { adminInfo, adminLogin } = useAdminAuth({}, { message })


    //return
    return {
      adminInfo,
      adminLogin,

    }
  },
})
</script>

<style scoped>
.ant-input-password {
  height: calc(6vh)
}
</style>