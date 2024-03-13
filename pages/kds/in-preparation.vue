<template>
  <div class="container">
    <div v-if="!isPending"
         class="grid grid-cols-5 gap-4 auto-rows-fr items-center justify-items-stretch content-start m-4">

      <div v-for="(order, index) in orders" class="bg-yellow-50 w-full h-full rounded-lg border border-yellow-500 p-5"
           @dblclick="doSomething()">
        <h3 class="text-5xl font-extrabold">00{{ order.orderNumber }}</h3>
        <p class="">Table #2</p>
        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">

        <div v-for="o in order.orderItems">
          <p class="text-xl my-2">{{ o.item.name }}</p>
          <p class="my-4 text-gray-500">

          </p>
        </div>

        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700">

        <div class="flex flex-col space-y-1">
          <svg class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7.6 8.5h8m-8 3.5H12m7.1-7H5c-.2 0-.5 0-.6.3-.2.1-.3.3-.3.6V15c0 .3 0 .5.3.6.1.2.4.3.6.3h4l3 4 3-4h4.1c.2 0 .5 0 .6-.3.2-.1.3-.3.3-.6V6c0-.3 0-.5-.3-.6a.9.9 0 0 0-.6-.3Z"/>
          </svg>
          <p class="text-gray-500">
            {{ order.kitchenNote }}
          </p>
        </div>

      </div>
    </div>
    <div class="w-screen text-center h-full py-48" v-else>
      <Loader/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {KitchenStatus} from "~/repository/models/ApiResponse";

const snackbar = useSnackbar();
import {IOrders} from "~/repository/models/ApiResponse";
import Loader from "~/components/units/Loader.vue";

const isPending = ref(true)
const {$api} = useNuxtApp();
const orders = ref({} as IOrders)
const branchId = '340328b2-cec0-4c5c-ba57-37a0f33dcf66'


definePageMeta({
  layout: "main",
});


onMounted(() => {
  getAllOrders()
})


const getAllOrders = () => {
  isPending.value = true;
  $api.order.getAllOrders(branchId, KitchenStatus.PREPARING).then(data => {
    orders.value = data.data
    isPending.value = false
  }).catch(error => {
    isPending.value = false
  })
}


</script>

<style scoped>

</style>
