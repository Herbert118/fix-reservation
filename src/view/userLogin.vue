<template>
  <div class="container">
    <a-card title="先锋维修预约系统" :bordered="false">

      <div class="formArea">
        <form>
          <a-row>
            <a-col :span="26"><a-input v-model:value="userInfo.stuEmail" placeholder="东北大学学生邮箱"></a-input></a-col>
          </a-row>
        <br>
        <a-row>
          <a-col :span="12"><a-button type="primary" htmlType="submit" block>确定</a-button></a-col>
        </a-row>
          
        </form>
      
      </div>
      <br>
      <a-card-meta>
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
form{
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ant-row{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ant-col{
  width:100%;
}
.ant-input {
  height: calc(6vh)
}


@media screen {

  
}




</style>