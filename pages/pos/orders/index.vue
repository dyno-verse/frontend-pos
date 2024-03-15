<template>
  <div class="pt-16">
    <div class="grid grid-cols-4">
      <div class="col-span-1 h-[845px] overflow-y-auto bg-gray-50 border-r border-gray-200">

        <div v-if="!isPending" class="h-36 rounded-lg text-gray-500 m-4 p-3 border border-gray-200 cursor-pointer"
             :class="[selectedOrderId === order.id  ? 'bg-red-50 border-red-100 text-gray-900' : 'bg-white']"
             @click="onOrderItemSelected(order.id)"
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
                    class="bg-gray-200 text-gray-500 text-xs font-medium  px-2.5 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{{
                    order.paymentStatus
                  }}</span>
                <span
                    class="text-white bg-gray-500 text-xs font-medium  px-2.5 py-1.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Cash</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="my-24">
          <Loader/>
        </div>

      </div>
      <div class="col-span-3">
        <div class="h-full w-full bg-white">
          <div v-if="!isLoadingOrder" class="p-5">
            <div>
              <div class="flex flex-row justify-between py-5 items-center">
                <div>
                  <h4 class="text-5xl">GHS {{ order.total }}</h4>
                  <p class="text-lg text-gray-500">Order No: #00{{ order.orderNumber }}</p>
                </div>

                <NuxtLink :to="`/pos/orders/payment/${order.id}`">
                  <button type="button"
                          class="px-10 py-3.5 text-base font-medium text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Charge
                  </button>
                </NuxtLink>
              </div>

              <hr class="py-5">

              <div class="flex flex-row justify-between py-2">
                <p>Kitchen Status</p>
                <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{{ order.kitchenStatus}}</span>
              </div>
              <div class="flex flex-row justify-between py-2">
                <p>Table Number</p>
                <p>{{ order.tableNumber }}</p>
              </div>
              <div class="flex flex-row justify-between py-2">
                <p>Payment Status</p>
                <p>{{ order.paymentStatus }}</p>
              </div>
              <div class="flex flex-row justify-between py-2">
                <p>Payment Type</p>
                <p>{{ order.paymentType }}</p>
              </div>

            </div>

            <hr class="mt-10">
            <!--            <h4>Order items</h4>-->
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 rounded-s-lg">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-e-lg">
                    Price
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr class="bg-white dark:bg-gray-800" v-for="orderItem in order.orderItems">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ orderItem.item.name }}
                  </th>
                  <td class="px-6 py-4">
                    {{ orderItem.quantity }}
                  </td>
                  <td class="px-6 py-4">
                    GHS {{ orderItem.total }}
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr class="font-semibold text-gray-900 dark:text-white hidden">
                  <th scope="row" class="px-6 py-3 text-base">Total</th>
                  <td class="px-6 py-3">3</td>
                  <td class="px-6 py-3">21,000</td>
                </tr>
                </tfoot>
              </table>
            </div>

          </div>
          <div v-else class="py-24">
            <Loader/>
          </div>
        </div>
      </div>
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
const isLoadingOrder = ref(true)
const {$api} = useNuxtApp()
const orders = ref({} as IOrders)
const order = ref({} as IOrders)
const branchId = '340328b2-cec0-4c5c-ba57-37a0f33dcf66'
const selectedOrderId = ref('')

onMounted(() => {
  getAllOrders()
})

const onOrderItemSelected = (orderId: string) => {
  selectedOrderId.value = orderId
  getOrder(orderId)
}


const getAllOrders = () => {
  isPending.value = true;
  $api.order.getOrders(branchId).then(data => {
    orders.value = data.data

    //Load first item in order list
    if (orders.value.length !== 0) {
      onOrderItemSelected(orders.value[0].id)
    }
    isPending.value = false
  }).catch(error => {
    isPending.value = false
  })
}

const getOrder = (orderId: string) => {
  isLoadingOrder.value = true
  $api.order.getOrder(orderId).then(data => {
    order.value = data.data
    isLoadingOrder.value = false

  }).catch(error => {
    isLoadingOrder.value = false

  })
}


</script>

<style scoped>

</style>
