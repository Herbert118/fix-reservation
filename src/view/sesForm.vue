
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
      label="限制"
      name="limit"
      :gutter="[16,64]"
      :rules="[{ required: true, message: 'Please input your limit!' }]"
    >
      <a-input v-model:value="sesInfo.limit"></a-input>
    </a-form-item>

<a-form-item
      label="地点"
      name="position_type"
      :gutter="[16,64]"
      :rules="[{ required: true, message: 'Please input your position!' }]"
    >
    <a-select
      ref="select"
      v-model:value="sesInfo.position_type"
      style="width: 120px"
      :options="options1"
    ></a-select>
    </a-form-item>

    <a-form-item
    label = "日期"
    name = "date"
    :gutter="[16,64]"
    :format = "dateFormat"
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
import { defineComponent, reactive,onMounted,ref } from "vue";
import {useStore} from "vuex"
import {message} from "ant-design-vue"
import axios from "axios"
import router from "../router"
import dayjs from 'dayjs'
export default defineComponent({
  props: {},
  setup() {
    const dateFormat = "YYYY-MM-DD"
    const store = useStore()
    const baseUrl = process.env.VUE_APP_BASEURL
     const options1 = ref([
      {
        value: '浑南校区',
        label: '浑南校区',
      },
      {
        value: '浑南校区',
        label: '南湖校区',
      }
    ]);
    //data
    const sesInfo = reactive({
      
      limit: "",
      position_type: "",
      date:dayjs(),
      time:[]
    });
    //method
    const onFinish = () => {
      const url = baseUrl + "/api/ses"
      const token = store.state.adminAuth

      const payload = {
        limit:sesInfo.limit,
        position_type:sesInfo.position_type,
        date:sesInfo.date.format(dateFormat),
        startTime:sesInfo.time[0],
        endTime:sesInfo.time[1],

      }
      axios
      .post(url,payload,{
        headers:{
          Authorization:`${token}`
        }
        
      })
      .then((res)=>{
        message.info(res.data.msg)
      })
      .catch((e)=>{
        message.warn("提交失败")
        console.log(e)
      })
      console.log(router.currentRoute.value)
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
   const logout = () => {
      store.commit("setAdminAuth", "");
      router.push("/admin/login");
    };
    //hook
    onMounted(() =>{
     
    })

//return
    return {
      sesInfo,
      onFinish,
      onFinishFailed,
      logout,
      options1,
      dateFormat
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