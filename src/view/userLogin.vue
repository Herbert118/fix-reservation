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
      <a-form-item
        name="email"
        label="学生邮箱" 
      >
        <a-input v-model:value="userInfo.stuEmail"></a-input>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 9, span: 13 }">
        <a-button type="primary" htmlType="submit" block>确定</a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";
export default defineComponent({
  props: {},
  setup() {
   
    //data
    const userInfo = reactive({
      stuEmail: "20206824@stu.neu.edu.cn",
    });
    //method
    const userLogin = () => {
      const url = `${process.env.VUE_APP_BASEURL}/api/userLogin`;
      const payload = {
        email: userInfo.stuEmail,
      };
     
      axios
        .post(url, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout:10000
        })
        .then((res) => {
          console.log(res.data);
          if(res.data.msg==="success"){
            message.info("邮件已发送")
          }
          else{
            message.warn("邮件发送失败")
          }
          
        })
        .catch((e) => {
          console.log(e);
          message.warn("邮件发送失败");
        });
    };

    //hook
    onMounted(() => {

    });

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