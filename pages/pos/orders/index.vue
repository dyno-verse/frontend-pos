<template>
  <div class="pt-16">
    <div class="grid grid-cols-4">
      <div class="col-span-1 h-[845px] overflow-y-auto bg-gray-50 border-r border-gray-200">
        <div>
          <div class="flex-row flex justify-center space-x-4 p-4">
            <p class="text-red-500 text-lg font-medium">Dine In</p>
            <p class="text-lg font-medium">Pick Up/ delivery</p>
          </div>

          <div class="flex-row flex px-5 space-x-2">
            <form class="flex-auto">
              <label for="search" class="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="search" id="search"
                       class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search" required/>
              </div>
            </form>
            <button type="button"
                    class="flex flex-row  justify-center space-x-2  text-white bg-red-50 font-medium rounded-lg text-sm px-5 py-4 me-2 mb-2">
              <svg class="w-6 h-6  text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                      d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
              </svg>
              <p class="text-red-500">Filter</p>
            </button>
          </div>
        </div>
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
              <h2 class="text-lg">{{ format('GHC', order.total) }}</h2>
              <div class="flex flex-row space-x-2 my-2 justify-end">
                <span
                    :class="[ order.paymentStatus === PaymentTypes.PAID ? 'bg-green-400 text-green-200' : 'bg-red-500 text-red-100']"
                    class="text-gray-500 text-xs font-medium  px-2.5 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{{
                    paymentStatus(order.paymentStatus)
                  }}</span>
                <span
                    v-if="order.paymentType"
                    :class="[ paymentTypeColors(order.paymentType)]"
                    class="text-white text-xs font-medium  px-2.5 py-1.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">{{
                    paymentType(order.paymentType)
                  }}</span>
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
                  <h4 class="text-5xl">{{ format('GHC', order.total) }}</h4>
                  <p class="text-lg text-gray-500">Order No: #00{{ order.orderNumber }}</p>

                </div>

                <div class="flex flex-row justify-end space-x-2">
                  <button type="button"
                          v-if="order.paymentStatus === PaymentTypes.PAID"
                          class="px-10 py-3.5 text-base font-medium text-white bg-red-500 rounded-lg text-center dark:bg-blue-600">
                    Print
                  </button>

                  <NuxtLink :to="`/pos/orders/payment/${order.id}`" v-if="order.paymentStatus === PaymentTypes.UNPAID">
                    <button type="button"
                            class="px-10 py-3.5 text-base font-medium text-white bg-red-500 rounded-lg text-center">
                      Charge
                    </button>
                  </NuxtLink>
                </div>
              </div>

              <hr class="py-5">

              <div class="flex flex-row justify-between py-2">
                <p>Kitchen Status</p>
                <span
                    :class="[ kitchenStatusColors(order.kitchenStatus)]"
                    class="text-green-700 text-xs text-white font-medium px-2.5 py-1.5 rounded-full">{{
                    kitchenStatusState(order.kitchenStatus)
                  }}</span>
              </div>
              <div class="flex flex-row justify-between py-2">
                <p>Table Number</p>
                <p>{{ order.tableNumber }}</p>
              </div>
              <div class="flex flex-row justify-between py-2">
                <p>Payment Status</p>
                <span
                    :class="[ order.paymentStatus === PaymentTypes.PAID ? 'bg-green-400 text-green-200' : 'bg-red-500 text-red-100']"
                    class="text-xs font-medium px-2.5 py-1.5 rounded-full">{{
                    paymentStatus(order.paymentStatus)
                  }}</span>
              </div>
              <div class="flex flex-row justify-between py-2" v-if="order.paymentType !== null">
                <p>Payment Type</p>
                <p>{{ paymentType(order.paymentType) }}</p>
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
                    {{ format('', orderItem.total) }}
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
import {PaymentTypes} from "~/repository/models/ApiResponse";

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
import {format} from 'money-formatter'
import {KitchenStatus} from "~/repository/models/ApiResponse";

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


const paymentStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case 'unpaid':
      return "Unpaid"
    case 'paid':
      return "Paid"
  }
}

const paymentType = (option: string) => {
  switch (option.toLowerCase()) {
    case 'cash':
      return "Cash"
    case 'mobile_money':
      return "Mobile Money"
    case 'card':
      return 'Bank card'
  }
}

const paymentTypeColors = (option: string) => {
  switch (option.toLowerCase()) {
    case 'cash':
      return 'bg-blue-400'
    case 'mobile_money':
      return 'bg-fuchsia-400'
    case 'card':
      return 'bg-orange-400'
    default:
      return 'bg-lime-400'
  }
}

const kitchenStatusState = (status: string) => {
  // switch (status.toUpperCase()) {
  //   case KitchenStatus.NOT_STARTED:
  //     return "Not started"
  //   case KitchenStatus.PREPARING:
  //     return "Preparing"
  //   case KitchenStatus.READY_TO_SERVE:
  //     return "Ready to serve"
  //   default:
  //     return 'Served'
  // }
}

const kitchenStatusColors = (status: string) => {
  // switch (status.toUpperCase()) {
    // case KitchenStatus.NOT_STARTED:
    //   return 'bg-orange-400'
    // case KitchenStatus.PREPARING:
    //   return 'bg-yellow-400'
    // case KitchenStatus.READY_TO_SERVE:
    //   return 'bg-green-400'
    // default:
    //   return 'bg-blue-400'
  // }
}


</script>

<style scoped>

</style>
