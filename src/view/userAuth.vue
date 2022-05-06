<template>
    <div>正在验证...</div>
</template>
<script>
import { defineComponent,onMounted } from 'vue'

import {message} from "ant-design-vue"
import useUserAuth from "../composables/useUserAuth"
export default defineComponent({
    setup() {
        const {userAuth} = useUserAuth({},{message})
        onMounted(userAuth)
    },
})
</script>
