<template>
  <div class="">
    <div class="grid grid-cols-8" v-if="!isPending">
      <div class="col-span-3 h-screen bg-white border-r p-5">

        <div class="h-[780px]">
          <div class="">
            <h3>Order Summary</h3>
            <p class="text-gray-500 text-sm">Select the preferred payment method</p>
            <hr class="my-4">
          </div>

          <div v-for="orderItem in order.orderItems" class="flex flex-row justify-between items-center py-2">
            <div>
              <p class="text-lg">{{ orderItem.item.name }}</p>
              <p class="text-sm text-gray-400">Quantity: {{ orderItem.quantity }}</p>
            </div>
            <p class="font-medium text-lg">
               {{ orderItem.total }}
            </p>
          </div>

        </div>

        <hr class="my-2">
        <div class="flex flex-row justify-between my-1">
          <p>Subtotal</p>
          <p>GHS {{ '300' }}</p>
        </div>
        <div class="flex flex-row justify-between my-1">
          <p>Tax Total</p>
          <p>GHS 0</p>
        </div>
        <div class="flex flex-row justify-between my-1">
          <p>Discount</p>
          <p>GHS 0</p>
        </div>
        <div class="flex flex-row justify-between my-1">
          <p class="font-bold text-2xl">Total</p>
          <p class="font-bold text-2xl">GHS {{ '400' }}</p>
        </div>
      </div>
      <div class="col-span-2 h-screen bg-white p-5">
        <div class="">
          <h3>Payment Method</h3>
          <p class="text-gray-500 text-sm">Select the preferred payment method</p>
          <hr class="my-4">
        </div>

        <div @click="selectPaymentType(type.type)"
             :class="[ selectedPaymentType === type.type ? 'bg-red-100 font-bold': 'bg-gray-100' ]"
             class="p-5 rounded-lg my-2 cursor-pointer" v-for="type in paymentMethods">
          <p>{{ type.name }}</p>
        </div>
      </div>

      <div class="col-span-3 h-screen bg-white border-l p-5">

        <div class="h-[430px]">

          <div class="">
            <div class="flex flex-row justify-between mb-2 items-center">
              <div>
                <h3>Amount Recieved</h3>
                <p class="text-gray-500 text-sm">Select the preferred payment method</p>
              </div>
              <h3>GHS 20.00</h3>
            </div>
            <hr class="my-4">
          </div>


          <div class="grid grid-cols-3 gap-4">
            <div v-for="i in cashNotes" class="text-red-500 font-medium bg-red-50 py-4 rounded-lg text-center">
              <p> {{ i }}</p>
            </div>

            <div class="col-span-3 flex flex-row justify-between bg-gray-50 font-medium p-3">
              <p>Change</p>
              <p>GHS 20.00</p>
            </div>
          </div>
        </div>

        <!--Numberpad-->
        <div class="">
          <div class="grid grid-cols-3 gap-4">
            <div v-for="num in numberPad" class="bg-gray-50 p-7 text-center rounded-lg">
              <p :class="[num.toLowerCase() === 'c' ? 'text-red-500 font-bold' : '']" class="text-2xl">{{ num }}</p>
            </div>
          </div>

          <button type="button"
                  class="my-4 focus:outline-none text-white bg-red-500 w-full hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-4 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Charge
          </button>
        </div>
      </div>
    </div>
    <div v-else class="h-screen bg-white py-48">
      <Loader/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IOrders} from "~/repository/models/ApiResponse";

const route = useRoute();
const orderId = route.params.id
const {$api} = useNuxtApp();
const isPending = ref(true)
const order = ref({} as IOrders)


onMounted(() => {
  // if (navigator.onLine) {
  //   console.log("online")
  // } else {
  //   console.log("offline")
  // }

  getOrder(orderId.toString())
})

import {PaymentType} from "~/helpers/general";
import Loader from "~/components/units/Loader.vue";

const selectedPaymentType = ref(PaymentType.CASH)

const cashNotes = ['0.50', '1.00', '2.00', '5.00', '10.00', '20.00', '50.00', '100.00', '200.00']
const numberPad = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'C'
]

const paymentMethods = [
  {name: 'Cash', type: PaymentType.CASH},
  {name: 'Mobile Money', type: PaymentType.MOBILE_MONEY},
  {name: 'Card', type: PaymentType.CARD},
]

const selectPaymentType = (type: PaymentType) => {
  selectedPaymentType.value = type
}

const getOrder = (orderId: string) => {
  isPending.value = true
  $api.order.getOrder(orderId).then(data => {
    order.value = data.data
    isPending.value = false

  }).catch(error => {
    isPending.value = false

  })
}

</script>

<style scoped>

</style>
