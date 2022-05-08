<template>
    <a-page-header title="预约维修系统" sub-title="查看预约信息">
        <template #extra>
            <a-button type="" @click="logout">注销</a-button>
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
import { message } from 'ant-design-vue';
import { useStore } from "vuex"

export default defineComponent({
    setup() {
        const store = useStore();
        const token = store.state.adminAuth;

        const { reservations,
            rsvColumns,
            cancelRsv,
            getRsvBySes } = useReservations({ token }, { message, undefined });

        onMounted(getRsvBySes);

        return {
            reservations,
            rsvColumns,
            cancelRsv

        }

    },
})
</script>
