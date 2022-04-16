<template>
    <div>正在验证...</div>
</template>
<script>
import { defineComponent,onMounted } from 'vue'
import router from "../router"
import {useStore} from "vuex"
import axios from "axios"
export default defineComponent({
    setup() {
        const store = useStore();
        //hook
        onMounted(()=>{
            if(router.currentRoute.value.query.token){
                 const url =  `${process.env.VUE_APP_BACK_END_HOST}/api/userAuth`
                axios
                .post(url,{
                    token:router.currentRoute.value.query.token
                })
                .then(()=>{
                    store.commit("setUserAuth",router.currentRoute.value.query.token);
                    router.push("/user/makeRsv")
                })
                .catch((err)=>{
                    alert(err)
                })
                
            }
            
        })
    },
})
</script>
