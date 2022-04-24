<template>
    <div>正在验证...</div>
</template>
<script>
import { defineComponent,onMounted } from 'vue'
import router from "../router"
import {useStore} from "vuex"
import axios from "axios"
import {message} from "ant-design-vue"
export default defineComponent({
    setup() {
        const store = useStore();
        //hook
        onMounted(()=>{
            let token = router.currentRoute.value.query.token
            if(token){
                 const url =  `${process.env.VUE_APP_BASEURL}/api/userAuth`
                axios
                .get(url,{
                    headers:{
                        Authorization:`${token}`
                    }
                })
                .then((res)=>{
                    if(res.data.msg==="success"){
                    console.log(res.data)
                    store.commit("setUserAuth",router.currentRoute.value.query.token);
                    store.commit("setUserInfo",{userId:res.data.id,userEmail:res.data.email})
                    router.push("/user/makeRsv")
                    }
                    else{
                        message.warn("msg:"+res.data.msg)
                    }
                })
                .catch((e)=>{
                    message.warn("error:user Auth fail")
                    console.log(e)
                })
                
            }
            
        })
    },
})
</script>
