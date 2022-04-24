
<template>
<a-page-header title = "预约维修系统" sub-title="填写预约信息">
  <template #extra>
    <a-button type="" @click="logout">注销</a-button>
    </template>
</a-page-header>
<div class = "page">
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
      :gutter="[16,64]"
      :rules="[{ required: true, message: 'Please input your model!' }]"
    >
      <a-input v-model:value="rsvInfo.model" />
    </a-form-item>

    <a-form-item
      label="问题"
      name="question"
      :gutter="[16,64]"
      :rules="[{ required: true, message: 'Please input your question!' }]"
    >
      <a-textarea v-model:value="rsvInfo.question"></a-textarea>
    </a-form-item>


    <a-form-item :wrapper-col="{ offset: 9, span: 13 }" :gutter="[16,32]">
      <a-button type="primary" html-type="submit" block>提交</a-button>
    </a-form-item>
    
  </a-form>
  </div>
</template>
   

<script>
import { defineComponent, reactive } from "vue";
import {useStore} from "vuex"
import {message} from "ant-design-vue"
import axios from "axios"
import router from "../router"
export default defineComponent({
  props: {},
  setup() {
    const baseUrl = process.env.VUE_APP_BASEURL
    const store = useStore()

    //data
    const rsvInfo = reactive({
      model: "",
      question: "",
    });
    //method
    const submitRsv = () => {
      const url = baseUrl+"/api/rsv"
      const sesID = router.currentRoute.value.query
      const token=store.state.userAuth
      const payload = {
        ...rsvInfo,
        sesID
      }
      axios
      .post(url,payload,{
        headers:{
          Authorization:`${token}`
        }
      })
      .then((res)=>{
        message.info(res.data.msg)
        router.push("/user/makeRsv")
      })
      .catch((e)=>{
        message.warning(e)
      })
      
    };

    const submitRsvFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

//return
    return {
      rsvInfo,
      submitRsv,
      submitRsvFailed,
    };
  },
});
</script>

<style scoped>
@import "../assets/css/stylesheet.css";


.ant-form{
  width: calc(50vw);
}

.ant-space{
  width: 100%;
}

</style>