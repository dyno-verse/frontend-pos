<template>
  <div class="pt-16">
    <div class="grid grid-cols-4">
      <div class="col-span-1 h-screen bg-gray-100">

        <div class="bg-white h-36 rounded-lg m-4 p-3" v-for="i in 5">
          <div class="flex flex-row justify-between">
            <div>
              <h3 class="text-lg">Order Number</h3>
              <p class="text-gray-500">Something</p>
              <p class="text-gray-500">Something</p>
              <p class="text-gray-500">Something</p>
            </div>

            <div class="flex-col flex text-right">
              <h2 class="text-lg">GHS 2,039</h2>
              <div class="flex flex-row space-x-2 my-2">
                <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium  px-2.5 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Unpaid</span>
                <span
                    class="bg-yellow-100 text-yellow-800 text-xs font-medium  px-2.5 py-1.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Cash</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-span-3"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "pos",
});
</script>

<style scoped>

</style>
