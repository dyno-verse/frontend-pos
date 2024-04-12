<template>
  <div class="h-screen h-lvh">
    <div class="bg-white border-b h-16 w-screen static fixed z-20 top-0 left-0">
      <div class="flex justify-between px-4 py-2 space-x-2">
        <div>
          <h1 class="text-2xl"></h1>
        </div>

        <button type="button"
                @click="signOut()"
                class="inline-flex  items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 5.4V3m0 2.4a5.3 5.3 0 0 1 5.1 5.3v1.8c0 2.4 1.9 3 1.9 4.2 0 .6 0 1.2-.5 1.2h-13c-.5 0-.5-.6-.5-1.2 0-1.2 1.9-1.8 1.9-4.2v-1.8A5.3 5.3 0 0 1 12 5.4Zm-8.1 5.3c0-2 .8-4.1 2.2-5.7m14 5.7c0-2-.8-4.1-2.2-5.7M8.5 18a3.5 3.5 0 0 0 7 0h-7Z"/>
          </svg>
        </button>

      </div>
    </div>

    <div>
      <slot/>
    </div>

    <div class="bg-white border-t h-16 w-screen fixed bottom-0 left-0">
      <div class="grid grid-cols-2 justify-items-center justify-between">
        <NuxtLink active-class="text-red-500 border-t-4 border-red-500 rounded-t" v-for="page in pages" :to="page.url">
          <div class="flex flex-row self-center text-center space-x-2 p-5">
            <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                    d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"/>
            </svg>
            <p>{{ page.name }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';

const {data, signOut, getSession} = useAuth()


const pages = [
  {
    name: 'Menus',
    icon: '',
    url: '/pos/menu'
  },
  {
    name: 'Orders',
    icon: '',
    url: '/pos/orders'
  },
  // {
  //   name: 'Settings',
  //   icon: '',
  //   url: '/pos/settings'
  // }
]

</script>

<style scoped>

</style>
