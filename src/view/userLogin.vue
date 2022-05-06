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
import { defineComponent} from "vue"

import { message } from "ant-design-vue"
import useUserAuth from "../composables/useUserAuth"
export default defineComponent({
  props: {},
  setup() {
   
    
    const {userInfo,userLogin} = useUserAuth({},{message});

    return {
      userInfo,
      userLogin,
    }
  },
})
</script>
<style scoped>
.ant-form {
  width: calc(50vw)
}
</style>