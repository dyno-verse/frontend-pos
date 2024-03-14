<template>
  <div class="pt-16">
    <div class="grid grid-cols-4">
      <div class="col-span-1 h-[845px] overflow-y-auto bg-gray-50 border-r border-gray-200">

        <div v-if="!isPending" class="bg-white h-36 rounded-lg m-4 p-3 border border-gray-200"
             :class="[selectedOrderId === order.id  ? 'bg-red-100' : 'bg-white']"
             v-for="order in orders">
          <div class="flex flex-row justify-between">
            <div>
              <h3 class="text-2xl">#00{{ order.orderNumber }}</h3>
              <p v-for="item in order.orderItems" class="text-gray-500">{{ item.item.name }}</p>
            </div>

            <div class="flex-col flex text-right">
              <h2 class="text-lg">GHS {{ order.total }}</h2>
              <div class="flex flex-row space-x-2 my-2">
                <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium  px-2.5 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{{
                    order.paymentStatus
                  }}</span>
                <span
                    class="bg-yellow-100 text-yellow-800 text-xs font-medium  px-2.5 py-1.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Cash</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="my-24">
          <Loader/>
        </div>

      </div>
      <div class="col-span-3"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IOrders} from "~/repository/models/ApiResponse";
import Loader from "~/components/units/Loader.vue";

definePageMeta({
  layout: "pos",
});

const isPending = ref(true)
const {$api} = useNuxtApp()
const orders = ref({} as IOrders)
const branchId = '340328b2-cec0-4c5c-ba57-37a0f33dcf66'
const selectedOrderId = ref('')

onMounted(() => {
  getAllOrders()
})

const onOrderItemSelected = () => {

}


const getAllOrders = () => {
  isPending.value = true;
  $api.order.getOrders(branchId).then(data => {
    orders.value = data.data
    console.log(orders.value)
    isPending.value = false
  }).catch(error => {
    isPending.value = false
  })
}


</script>

<style scoped>

</style>
