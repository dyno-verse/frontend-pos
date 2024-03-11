<template>
  <div class="flex flex-col justify-center text-center items-center pb-10">
    <div id="backdrop"
         class="w-full h-40 rounded-b-3xl z-20">
      <object
          class="w-full bg-black h-40 bg-blend-color-burn"
          style="border-radius: 0 0 3.5rem 3.5rem; height:10rem;"
          :data="backdropImage"></object>
    </div>

    <img :src="props.businessLogo" class="w-1/5 z-30 -mt-10 rounded-full border-4 border-white"/>
    <h3 class="font-bold text-2xl">{{ props.name }}</h3>
    <p class="text-neutral-300">
      {{ props.description }}
    </p>
    <p>{{ props.location }}</p>
  </div>
</template>

<script lang="ts" setup>


export interface BusinessDetailsProps {
  businessLogo?: string
  name?: string
  description?: string
  contact?: string,
  location?: string

  backdropImage?: string
}

const props = withDefaults(defineProps<BusinessDetailsProps>(), {
  businessLogo: '/imgs/la_comida.png',
  name: 'La Comida',
  description: '  Your favorite food on every corner.',
  contact: '',
  backdropImage: '',
  location: 'Kokomlemle, Accra-Ghana',
})

</script>

<style scoped>

</style>
