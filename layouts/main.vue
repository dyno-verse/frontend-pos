<template>
  <div class="h-full">
    <nav class="bg-white static border-gray-200 dark:bg-gray-900 border-b border-gray-200">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">

        </a>

        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.1 4H5c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm-10 10H5c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Z"/>
          </svg>

          <button data-collapse-toggle="navbar-cta" type="button"
                  class="inline-flex items-center p-2 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
        </div>
      </div>
    </nav>

    <div>
      <slot/>
    </div>

    <div class="bg-white border-t h-16 w-screen absolute bottom-0 left-0">
      <div class="grid grid-cols-3 justify-items-center justify-between">
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

const pages = [
  {
    name: 'Not Started',
    icon: '',
    url: '/kds/'
  },
  {
    name: 'In Preparation',
    icon: '',
    url: '/kds/in-preparation'
  },
  {
    name: 'Ready To Serve',
    icon: '',
    url: '/kds/ready-to-serve'
  }
]

</script>

<style scoped>

</style>
