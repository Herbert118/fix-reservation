
<template>
  <a-page-header title="预约维修系统" sub-title="管理员登录"> </a-page-header>
  <div class="page">
    <a-form
      :model="adminInfo"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="adminLogin"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="账号"
        name="username"
        :gutter="[16, 64]"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="adminInfo.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :gutter="[16, 64]"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="adminInfo.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 9, span: 13 }" :gutter="[16, 32]">
        <a-button type="primary" html-type="submit" block>登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
   

<script>
import { defineComponent, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import router from "../router";
import axios from "axios";
import { message } from "ant-design-vue";
export default defineComponent({
  props: {},
  setup() {
    const store = useStore();
    //data
    const adminInfo = reactive({
      account: "",
      password: "",
    });
    //method
    const adminLogin = (values) => {
      const url = `${process.env.VUE_APP_BASEURL}/api/adminLogin`;
      const payload = {
        account: values.account,
        password: values.password,
      };

      axios
        .post(url, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          store.commit("setAdminAuth", res.data.token);
          router.push("/admin/manageSes");
        })
        .catch((e) => {
          console.log(e);
          message.warning("登录失败");
        })
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    //hook
    onMounted(() => {
      if (store.state.adminAuth) {
        router.push("/admin/manageSes");
      }
    });

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
  width: calc(50vw);
}

.ant-space {
  width: 100%;
}
.ant-page-header {
  border: solid 1px gainsboro;
}
</style>