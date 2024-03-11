<template>
  <!--Card Strip-->
  <div class="flex flex-col mx-5 py-5 px-5 bg-white rounded-2xl mb-5 drop-shadow-md">
    <div class="flex flex-row items-center justify-between">
      <div>
        <h3 class="font-bold text-lg">{{ props.title }}</h3>
        <p>{{ props.description }}</p>
      </div>

      <img src="/imgs/ic-arrow-black.svg">
    </div>
  </div>
</template>

<script lang="ts" setup>

export interface CardStripProps {
  title?: string
  description?: string

}

const props = withDefaults(defineProps<CardStripProps>(), {
  title: 'Sandwiches',
  description: 'Juicy flavors in between your breaded'
})

</script>

<style scoped>

</style>
