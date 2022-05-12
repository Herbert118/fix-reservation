<template>
  <div class="container">
    <a-card title="先锋维修预约系统" :bordered="false">

      <div class="formArea">
        <a-row>
          <a-col :span="24">
            <a-input v-model:value="userFormData.stuEmail" placeholder="东北大学学生邮箱"></a-input>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-button type="primary" @click="userLogin" block>确定</a-button>
          </a-col>
        </a-row>
      </div>
      <br>
      <a-card-meta>
        <template #description>提交您的邮箱后,<br>将会向该邮箱发送包含登录链接的邮件, 请注意查收</template>
      </a-card-meta>

    </a-card>
  </div>
</template>

<script>
import { defineComponent } from "vue"

import { message } from "ant-design-vue"
import useUserAuth from "../composables/useUserAuth"
export default defineComponent({
  props: {},
  setup() {
    const {userFormData, userLogin } = useUserAuth({}, { message });

    return {
     userFormData,
      userLogin,
    }
  },
})
</script>
