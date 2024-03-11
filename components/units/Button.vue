<template>
  <div v-if="props.type === ButtonTypes.Primary">
    <button :class="buttonStyles">
      <div class="flex flex-row space-x-2">
        <p>{{ props.label }}</p>
      </div>
    </button>
  </div>
  <div v-else-if="props.type === ButtonTypes.Secondary">
    <button :class="buttonStyles">{{ props.label }}</button>
  </div>
  <div v-else>
    <button class="bg-red-500 px-10 text-white py-4 rounded-full">{{ props.label }}</button>
  </div>
</template>

<script lang="ts" setup>
import {ButtonStates, ButtonTypes} from "~/components/Constants";

interface ButtonProps {
  label: string
  type?: ButtonTypes,
  state?: ButtonStates
  // size?: number
}


const buttonStyles = computed(() => {
  switch (props.type) {
    case ButtonTypes.Primary:
      // return 'bg-red-500 px-10 text-white font-bold text-center justify-center items-center py-4 rounded-lg w-full';
      return 'w-full justify-center text-white bg-red-500 px-10 text-white font-bold  py-4 rounded-lg inline-flex items-center';
    case ButtonTypes.Secondary:
      return 'border-red-500 border-2 px-10 font-bold text-red-500 py-4 rounded-lg';
  }
  return 'border-red-500 border px-10 font-bold text-red-500 py-4 rounded-2xl'
})


//Declares defaults and specifies the defaults
const props = withDefaults(defineProps<ButtonProps>(), {
  label: 'Button',
  type: ButtonTypes.Secondary,
  state: ButtonStates.Active,
  // size: 0
})

</script>

<style scoped>

</style>
