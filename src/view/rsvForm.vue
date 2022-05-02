
<template>
  <a-page-header title="预约维修系统" sub-title="填写预约信息">
    <template #extra>
      <a-button type="" @click="logout">注销</a-button>
    </template>
  </a-page-header>
  <div class="page">
    <a-form
      :model="rsvInfo"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="submitRsv"
      @finishFailed="submitRsvFailed"
    >
      <a-form-item
        label="型号"
        name="model"
        :gutter="[16, 64]"
        :rules="[{ required: true, message: 'Please input your model!' }]"
      >
        <a-input v-model:value="rsvInfo.model" />
      </a-form-item>

      <a-form-item
        label="问题"
        name="question"
        :gutter="[16, 64]"
        :rules="[{ required: true, message: 'Please input your question!' }]"
      >
        <a-textarea v-model:value="rsvInfo.question"></a-textarea>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 9, span: 13 }" :gutter="[16, 32]">
        <a-button type="primary" html-type="submit" block>提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
   

<script>
import { defineComponent, onMounted } from "vue";
import { message } from "ant-design-vue";
import store from "../store";

import router from "../router";
import useReservations from "../composables/useReservations";
export default defineComponent({
  props: {},
  setup() {
    const baseUrl = process.env.VUE_APP_BASEURL;

    //data
    const { rsvInfo, submitRsv } = useReservations(
      { baseUrl },
      { message, router }
    );
    //method

    const submitRsvFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const logout = () => {
      store.commit("setUserAuth", "");
      store.commit("setUserInfo", {});
      router.push("/user/login");
    };
    //hook
    onMounted(() => {
      console.log(router.currentRoute.value.query);
    });

    //return
    return {
      rsvInfo,
      submitRsv,
      submitRsvFailed,
      logout,
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
</style>