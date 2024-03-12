<template>
  <div class="w-screen">
    <div class="grid grid-cols-10 justify-center gap-x-4 pt-16 mt-2">

      <div class="static col-span-2 h-full overflow-y-auto border-r border-gray-200 ">

        <div class="bg-gray-50 rounded-r-lg border-l-4 border-red-500 px-5 py-6 mb-2" v-for="i in 7">
          <p class="text-gray-800 text-lg">Main Dishes</p>
        </div>

      </div>

      <div class="col-span-5 h-full bg-white overflow-y-auto">
        <div class="mb-4 mt-2">

          <form>
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

        </div>
        <div class="grid grid-cols-3 gap-4">

          <div class="bg-gray-100 rounded-lg p-5 text-center items-center justify-center flex flex-col" v-for="i in 15">

            <svg class="w-6 h-6 text-gray-800 dark:text-white self-end" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                    d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
            </svg>

            <p class="mb-10 mt-2">Alcoholic Drinks</p>
          </div>

        </div>
      </div>

      <div class="relative right-0 col-span-3 h-full border-l overflow-y-auto">
        <div class="p-5">
          <div class="">
            <h2 class="text-lg">Order Details</h2>
            <hr class="my-2">
          </div>

          <div class="overflow-y-scroll h-[585px]">
            <div class="flex flex-row justify-between items-center my-4" v-for="i in 34">
              <div class="flex-col flex">
                <h3>Meal name</h3>
                <p>Quantity: 5</p>
              </div>
              <div>
                <h3>GHS 20.90</h3>
              </div>
            </div>
          </div>

          <div class="static bottom-0 left-0">
            <hr class="my-2">
            <div class="flex flex-row justify-center my-4 space-x-2">

              <div class="bg-red-50 p-5 w-1/2 text-center flex flex-col items-center rounded-lg">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-width="2"
                        d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                </svg>

                <p>Eat In</p>
              </div>

              <div class="bg-gray-50 p-5 w-1/2 text-center flex flex-col items-center rounded-lg">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z"/>
                </svg>

                <p>Takeout</p>
              </div>
            </div>

            <button type="button"
                    class="focus:outline-none text-white bg-red-500 w-full hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Place Order
            </button>
          </div>

        </div>
      </div>
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
