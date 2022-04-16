
<template>
<a-page-header title = "预约维修系统" sub-title="填写场次信息">
  <template #extra>
    <a-button type="" @click="logout">注销</a-button>
    </template>
</a-page-header>
<div class = "page">
  <a-form
    :model="sesInfo"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
  
    <a-form-item
      label="地点"
      name="position"
      :gutter="[16,64]"
      :rules="[{ required: true, message: 'Please input your position!' }]"
    >
      <a-input v-model:value="sesInfo.position" />
    </a-form-item>

    <a-form-item
      label="限制"
      name="limit"
      :gutter="[16,64]"
      :rules="[{ required: true, message: 'Please input your limit!' }]"
    >
      <a-input v-model:value="sesInfo.limit"></a-input>
    </a-form-item>
    <a-form-item
    label = "日期"
    name = "date"
    :gutter="[16,64]"
    :format = "'YYYY-MM-DD'"
     :rules="[{ required: true, message: 'Please input date!' }]"
    >

        <a-date-picker v-model:value="sesInfo.date" />
    </a-form-item>

    <a-form-item
    label = "时间"
    name = "time"
    :gutter="[16,64]"
    :rules="[{ required: true, message: 'Please input time!' }]"
    >
    
       <a-time-range-picker 
       v-model:value="sesInfo.time" 
       :valueFormat ="'HH:mm:ss'"
       />
    </a-form-item>


    <a-form-item :wrapper-col="{ offset: 9, span: 13 }" :gutter="[16,32]">
      <a-button type="primary" html-type="submit" block>提交</a-button>
    </a-form-item>
    
  </a-form>
  </div>
</template>
   

<script>
import { defineComponent, reactive,onMounted } from "vue";
import router from "../router"
export default defineComponent({
  props: {},
  setup() {
    //data
    const sesInfo = reactive({
      position: "",
      limit: "",
      date:"",
      time:[]
    });
    //method
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    //hook
    onMounted(() =>{
      
      console.log(router.currentRoute.value);
    })

//return
    return {
      sesInfo,
      onFinish,
      onFinishFailed
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