<template>
  <div class="w-full">
    <div
        class="grid grid-cols-3 items-center align-middle mt-20">
      <div class="flex flex-col w-full justify-center col-start-2">

        <div class="justify-center items-center flex flex-col my-5">
          <img :src="businessInfo.logoUrl" class="w-24 h-24"/>
          <h3 class="text-2xl">{{ businessInfo.name }}</h3>
        </div>

        <div class="w-full border border-gray-200 rounded-lg p-5 bg-white" v-for="branch in businessInfo.branches">
          <div class="flex flex-row justify-between items-center">
            <div>
              <h4 class="text-xl">{{ branch.name }}</h4>
              <p>{{ branch.address }}</p>
            </div>

            <div>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m9 5 7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import business from "~/repository/modules/business";
import {IBusinessInfo} from "~/repository/models/ApiResponse";

const {$api} = useNuxtApp();
const isBusinessLoading = ref(true)
const businessInfo = ref({} as IBusinessInfo)


const {data, signOut, getSession} = useAuth()


onMounted(() => {

  console.log()

  const businessId = data.value.businessId
  $api.business.getBusinessInfoById(businessId).then(data => {
    businessInfo.value = data.data
  }).catch(error => {
  })
})


</script>

<style scoped>

</style>
