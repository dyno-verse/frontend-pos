<template>
  <div class="mx-auto">
    <div v-if="!isPending"
         class="grid grid-cols-5 gap-4 auto-rows-fr items-center justify-items-stretch content-start m-4">

      <div v-if="orders.length !== 0" v-for="(order, index) in orders"
           class="bg-red-50 w-full h-full rounded-lg border border-red-500 p-5"
           @dblclick="updateOrderStatus(order.id, index)">
        <h3 class="text-5xl font-extrabold">00{{ order.orderNumber }}</h3>
        <p class="">Table #{{ order.tableNumber }}</p>

        <div v-for="o in order.orderItems" class="bg-red-50 border-dashed border border-red-400 rounded-lg my-2">
          <p class="text-2xs my-3 mx-3">{{ o.item.name }} (x{{ o.quantity}})</p>
        </div>

        <div class="flex flex-col space-y-1">
          <svg v-if="order.kitchenNote.length !== 0" class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7.6 8.5h8m-8 3.5H12m7.1-7H5c-.2 0-.5 0-.6.3-.2.1-.3.3-.3.6V15c0 .3 0 .5.3.6.1.2.4.3.6.3h4l3 4 3-4h4.1c.2 0 .5 0 .6-.3.2-.1.3-.3.3-.6V6c0-.3 0-.5-.3-.6a.9.9 0 0 0-.6-.3Z"/>
          </svg>
          <p class="text-gray-500">
            {{ order.kitchenNote }}
          </p>
        </div>

      </div>
      <div v-else class="col-span-6 mt-12">
        <EmptyState/>
      </div>

    </div>
    <div class="w-screen text-center h-full py-48" v-else>
      <Loader/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IKitchenStatus, IOrders, KitchenStatus} from "../../repository/models/ApiResponse";

const branchId = '340328b2-cec0-4c5c-ba57-37a0f33dcf66'
const snackbar = useSnackbar();
const orders = ref({} as IOrders)


import Loader from "~/components/units/Loader.vue";

definePageMeta({
  layout: "main",
});

const isPending = ref(true)
const {$api} = useNuxtApp();

onMounted(() => {
  getAllOrders()
})


const updateOrderStatus = (orderId: string, position: number) => {
  const request: IKitchenStatus = {
    kitchenStatus: KitchenStatus.PREPARING
  }
  orders.value.splice(position, 1)

  $api.order.updateKitchenStatus(orderId, request).then(data => {
    snackbar.add({
      type: 'success',
      text: 'Order moved'
    })
  }).catch(error => {
  })
}


const getAllOrders = () => {
  isPending.value = true;
  $api.order.getAllOrders(branchId, KitchenStatus.NOT_STARTED).then(data => {
    orders.value = data.data
    isPending.value = false
    console.log(data.data)
  }).catch(error => {
    isPending.value = false
  })
}

</script>

<style scoped>

</style>
