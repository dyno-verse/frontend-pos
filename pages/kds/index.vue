<template>
  <div class="container">
    <div class="flex flex-row flex-wrap w-screen my-6 px-2">
      <div v-for="i in 8" class="bg-gray-100 h-96 w-1/4 rounded-lg border p-5">
        <h3 class="text-5xl font-extrabold">00{{ i }}</h3>
        <p class="">Table #2</p>
        <hr class="my-2">
        <h3 class="text-xl my-2">Assorted fried rice</h3>
        <p class="my-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "main",
});
</script>

<style scoped>

</style>
