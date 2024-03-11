<template>
  <div class="bg-white rounded-3xl px-10 hover:bg-purple-600 hover:text-white">
    <div class="block bg-purple-700 dark:bg-red-500 items-end h-30 w-12 pt-12 rounded-b text-center">
      <h3 class="text-6xl inline text-yellow-50 px-2">{{ props.step }}</h3>
    </div>
    <h5 class="font-bold text-2xl mt-16 text-black dark:text-black-900">{{ props.action }}</h5>
    <p class="dark:text-black-900 text-neutral-500 my-5">
      With just your email and password, you can set up your restaurant details for your customers to know.
    </p>
    <div class="block bg-purple-700 dark:bg-red-500 py-2 w-12 h-3 mt-2 rounded-t">
    </div>
  </div>

</template>

<script lang="ts" setup>

const props = defineProps<{ step: number, action: string }>()

</script>

<style scoped>

</style>
