
<template>
  <a-page-header title="预约维修系统" sub-title="填写预约信息">
    <template #extra>
      <a-button type="" @click="logout">注销</a-button>
    </template>
  </a-page-header>
  <div class="narrPage">
    <div class="formBox">
      <a-form :model="rsvInfo" name="basic" :label-col="{ offset: 0, span: 0 }" :wrapper-col="{ offset: 1, span: 20 }"
        autocomplete="off" @finish="submitRsv" @finishFailed="submitRsvFailed">
        <a-form-item label="型号" name="model" :rules="[{ required: true, message: 'Please input your model!' }]">
          <a-input v-model:value="rsvInfo.model" placeholder="电脑型号"/>
        </a-form-item>

        <a-form-item label="问题" name="question" :rules="[{ required: true, message: 'Please input your question!' }]">
          <a-textarea v-model:value="rsvInfo.question" placeholder="遇到的问题或者需要的服务"></a-textarea>
        </a-form-item>
        <br>
        <a-form-item :wrapper-col="{ offset: 6, span: 12 }">
          <a-button type="primary" html-type="submit" block>提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
   

<script>
import { defineComponent, onMounted } from "vue";
import { message } from "ant-design-vue";
import store from "../store";

import { useRouter } from "vue-router";
import useReservations from "../composables/useReservations";
export default defineComponent({
  props: {},
  setup() {
    const router = useRouter();
    
    const token = store.state.userAuth;
    //data
    const { rsvInfo, submitRsv } = useReservations(
      { token },
      { message,  undefined}
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
  width: calc(45vw);
}

.ant-space {
  width: 100%;
}
</style>