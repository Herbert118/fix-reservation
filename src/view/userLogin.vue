<template>
  <div class="container">
    <a-card title="先锋维修预约系统" :bordered="false">

      <a-form :model="userInfo" name="userInfoForm" autocomplete="off" @finish="userLogin" :wrapper-col="{ offset:1,span: 22 }">
        <a-form-item name="email">
          <a-input v-model:value="userInfo.stuEmail" placeholder="东北大学学生邮箱"></a-input>
        </a-form-item>
        <br>
        <a-form-item :wrapper-col="{ offset: 6, span: 12 }">
          <a-button type="primary" htmlType="submit" block>确定</a-button>
        </a-form-item>
      </a-form>

      <a-card-meta >
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
    const { userInfo, userLogin } = useUserAuth({}, { message });

    return {
      userInfo,
      userLogin,
    }
  },
})
</script>
<style scoped>
.ant-form {
  width: calc(25vw);

}
.ant-input{
  height:calc(6vh)
}


</style>