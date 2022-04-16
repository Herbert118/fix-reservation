<template>
  <a-page-header title="预约维修系统" sub-title="用户登录"></a-page-header>
  <div class="page">
    <a-form
      :model="userInfo"
      name="userInfoForm"
      autocomplete="off"
      @finish="userLogin"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item name="email" label="学生邮箱">
        <a-input v-model:value="userInfo.stuEmail"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 9, span: 13 }">
        <a-button type="primary" htmlType="submit"  block>确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import router from "../router"
import {useRouter} from 'vue-router'
import axios from "axios"
import { message } from 'ant-design-vue';
export default defineComponent({
  props: {},
  setup() {
    const store = useStore();
    const router2 = useRouter()
    //data
    const userInfo = reactive({
      stuEmail: "a@a.com",
    });
    //method
    const userLogin = (values) => {
      console.log(values);

      const url =  `${process.env.VUE_APP_BACK_END_HOST}/api/userLogin`
      const payload = {
        email:userInfo.stuEmail
        }

      axios
      .post(url,payload,{
          headers: {
            'Content-Type': 'application/json'
          },
        })
      .then((res)=>{
        store.commit("setUserAuth",res.token) 
        router.push("/user/makeRsv")
      })
      .catch((e)=>{
        console.log(e)
        message.warning(e)
      })
    };

    //hook
    onMounted(()=>{
      console.log(router2.currentRoute.value);
      alert("fuxxk")
    })

    return {
      userInfo,
      userLogin,
    };
  },
});
</script>
<style scoped>
.ant-form {
  width: calc(50vw);
}
</style>