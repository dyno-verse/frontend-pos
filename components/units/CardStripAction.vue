<template>
  <!--Card Strip-->
  <div class="flex flex-col mx-5 py-5 px-5 bg-white rounded-2xl mb-5 drop-shadow-md">
    <div class="flex flex-row items-start justify-start space-x-4">
      <img :src="props.imgUrl" class="w-1/5">
      <div>
        <h3 class="font-bold text-lg">{{ props.title }}</h3>
        <p>{{ props.description }}</p>
        <div class="flex flex-row justify-start mt-2">
          <p class="bg-green-700 text-sm rounded-full px-2 py-1 font-bold text-white">{{ props.currency }}
            {{ props.amount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

export interface CardStripActionProps {
  title?: string
  imgUrl?: string
  description?: string
  amount?: number,
  currency?: string
}

const props = withDefaults(defineProps<CardStripActionProps>(), {
  title: 'Lasagna',
  imgUrl: '/imgs/la_comida.png',
  description: 'Something sweet must be eaten',
  amount: 40.0,
  currency: 'GHS '
})

</script>

<style scoped>

</style>
