<template>
    <a-page-header title="先锋维修预约系统" sub-title="查看预约信息" @back="() => $router.push('/admin/manageSes')">
        <template #extra>
            <a-button type="" @click="adminLogout">注销</a-button>
        </template>
    </a-page-header>
    <div class="page">
        <a-table :dataSource="reservations" :columns="rsvColumns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.title == 'operation'">
                    <a-popconfirm v-if="sessions.length" title="确定撤销吗?" @confirm="cancelRsv(record.id)">
                        <a-button type="">撤销</a-button>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import useReservations from "../composables/useReservations"
import { message } from 'ant-design-vue'
import useAdminAuth from '@/composables/useAdminAuth'

export default defineComponent({
    setup() {
        const { adminToken, adminLogout } = useAdminAuth({}, { message })
        const token = adminToken
        
        const { reservations,
            rsvColumns,
            cancelRsv,
            getRsvBySes } = useReservations({ token }, { message, undefined })

        onMounted(getRsvBySes)

        return {
            reservations,
            rsvColumns,
            cancelRsv,
            adminLogout

        }

    },
})
</script>
