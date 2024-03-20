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
              <p class="text-sm text-gray-400">x {{ orderItem.quantity }}</p>
            </div>
            <p class="font-medium text-lg">
              {{ format('', orderItem.total) }}
            </p>
          </div>

        </div>

        <hr class="my-2">
        <div class="flex flex-row justify-between my-1">
          <p>Subtotal</p>
          <p>{{ format('GHC', order.total) }}</p>
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
          <p class="font-bold text-2xl">{{ format('GHC', order.total) }}</p>
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
             class="p-5 rounded-lg my-2 cursor-pointer flex flex-row space-x-2" v-for="type in paymentMethods">

          <svg v-if="type.type === PaymentType.CASH" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                  d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
          </svg>

          <svg v-if="type.type === PaymentType.MOBILE_MONEY" class="w-6 h-6 text-gray-800 dark:text-white"
               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
               viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"/>
          </svg>

          <svg v-if="type.type === PaymentType.CARD" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"/>
          </svg>

          <p>{{ type.name }}</p>
        </div>
      </div>

      <div class="col-span-3 h-screen bg-white border-l p-5">

        <div class="h-[380px]" v-if="selectedPaymentType === PaymentType.CASH">

          <div class="">
            <div class="flex flex-row justify-between mb-2 items-center">
              <div>
                <h3>Amount Received</h3>
                <p class="text-gray-500 text-sm">Select the preferred payment method</p>
              </div>
              <h3>{{ format('GHC', noteSelected) }}</h3>
            </div>
            <hr class="my-4">
          </div>


          <!--Show when the selected type is CASH-->
          <div class="grid grid-cols-3 gap-4">
            <div v-for="note in cashNotes" class="font-medium bg-red-50 py-4 rounded-lg text-center cursor-pointer"
                 :class="[noteSelected === note ? 'bg-red-500 text-white' : 'text-red-500']"
                 @click="cashNoteSelected(note)">
              <p> {{ note }}</p>
            </div>

            <div class="col-span-3 flex flex-row justify-between bg-gray-50 font-medium p-3">
              <p>Change</p>
              <p>{{ format('GHC', displayCashChange(noteSelected, order.total)) }}</p>
            </div>
          </div>
        </div>

        <div class=""
             v-if="selectedPaymentType === PaymentType.CARD || selectedPaymentType === PaymentType.MOBILE_MONEY">
          <div class="">
            <div class="flex flex-row justify-between mb-2 items-center">
              <div>
                <h3>Payment Reference</h3>
                <p class="text-gray-500 text-sm">Select the preferred payment method</p>
              </div>
            </div>
            <hr class="my-4">
          </div>

          <input type="text"
                 v-model="paymentReference"
                 placeholder="Enter Reference ID"
                 class="block  w-full text-right p-4 my-2 text-gray-900 border-transparent  bg-gray-50 text-3xl">

          <button type="button"
                  @click="chargeOrder()"
                  class="my-4 focus:outline-none text-white bg-red-500 w-full hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-4 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Charge
          </button>
        </div>


        <!--Numberpad-->
        <div class="" v-if="selectedPaymentType === PaymentType.CASH">
          <input type="text"
                 :value="format('',currentValue)"
                 disabled readonly
                 class="block  w-full text-right p-4 my-2 text-gray-900 border-transparent  bg-gray-50 text-3xl">

          <div class="grid grid-cols-3 gap-4">
            <div v-for="num in numberPad" class="bg-gray-50 p-7 text-center rounded-lg"
                 @click="onNumberPadClicked(num)">
              <p :class="[num.toLowerCase() === 'c' ? 'text-red-500 font-bold' : '']" class="text-2xl">{{ num }}</p>
            </div>
          </div>

          <button type="button"
                  @click="chargeOrder()"
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

const route = useRoute()
const router = useRouter()
const orderId = route.params.id
const {$api} = useNuxtApp()
const isPending = ref(true)
const order = ref({} as IOrders)
const snackbar = useSnackbar()
const paymentReference = ref(null)
const noteSelected = ref('0')
import {Calculator} from '~/helpers/calculator';

const calculator = new Calculator();
const currentValue = ref<number>(calculator.getCurrentValue());
import {format} from 'money-formatter';


onMounted(() => {

  getOrder(orderId.toString())
})

import {PaymentType} from "~/helpers/general";
import Loader from "~/components/units/Loader.vue";
import {IPayment} from "~/repository/models/ApiResponse";
import {PaymentTypes} from "~/repository/models/ApiResponse";
import {SymbolKind} from "vscode-languageserver-types";
import Number = SymbolKind.Number;

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
  noteSelected.value = '0'
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

const displayCashChange = (noteReceived: string, totalAmount: number) => {
  if (parseInt(noteReceived) < totalAmount) {
    return 0
  }
  return (parseInt(noteReceived) - totalAmount)
}

const cashNoteSelected = (note: string) => {
  noteSelected.value = note
}

const chargeOrder = () => {
  const data: IPayment = {
    paymentReference: paymentReference.value,
    paymentStatus: PaymentTypes.PAID,
    paymentType: selectedPaymentType.value
  }

  $api.order.updatePaymentStatus(order.value.id, data).then(data => {
    snackbar.add({
      type: 'success',
      text: 'Payment received or something'
    })
    router.push('/pos/menu')
  }).catch(error => {
  })
}

const onNumberPadClicked = (number: string) => {
  switch (number.toLowerCase()) {
    case 'c':
      clear()
      return;
    case '.':
      appendDecimal();
      return;
    default:
      appendDigit(parseInt(number))
      // numberPadValues.value.push(number)
      return;

  }
}


const appendDigit = (digit: number) => {
  calculator.appendDigit(digit);
  currentValue.value = calculator.getCurrentValue();
};

const appendDecimal = () => {
  calculator.appendDecimal();
  currentValue.value = calculator.getCurrentValue();
};

const clear = () => {
  calculator.clear();
  currentValue.value = calculator.getCurrentValue();
};

</script>

<style scoped>

</style>
