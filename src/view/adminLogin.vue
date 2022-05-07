
<template>
  <div class="container">
    <a-card title="先锋维修预约系统-管理员登录" :bordered="false">

      <a-form :model="adminInfo" name="basic"  :wrapper-col="{ offset:1,span: 22 }" autocomplete="off"
        @finish="adminLogin" @finishFailed="onFinishFailed">
        <a-form-item name="account" 
          :rules="[{ required: true, message: 'Please input your account!' }]">
          <a-input v-model:value="adminInfo.account" placeholder="管理员账号" />
        </a-form-item>

        <a-form-item  name="password" 
          :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="adminInfo.password" placeholder="密码"/>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 12 }" :gutter="[16, 32]">
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
   

<script>
import { defineComponent } from "vue";
import { message } from "ant-design-vue";
import useAdminAuth from "../composables/useAdminAuth";
export default defineComponent({
  props: {},
  setup() {
    const { adminInfo, adminLogin } = useAdminAuth({}, { message });
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    //return
    return {
      adminInfo,
      adminLogin,
      onFinishFailed,
    };
  },
});
</script>

<style scoped>
@import "../assets/css/stylesheet.css";

.ant-form {
  width: calc(25vw);

}

.ant-input {
  height: calc(5vh) 
}
.ant-input-password{
  height: calc(5vh) 
}
</style>