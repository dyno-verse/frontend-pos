<template>
  <div>
    <h1 :class="size" class="font-bold my-5">
      {{ props.label }}
    </h1>
  </div>
</template>

<script lang="ts" setup>

interface LeadTitleProps {
  label: string,
  size?: number
}

const size = computed(() => {
  // if (props.size <= 9) {
  return `text-${props.size}xl`
  // }
  // return '2xl:text-8xl xl:text-8xl md:text-6xl sm:text-5xl text-6xl font-bold my-5 text-black dark:text-white'
})

const props = withDefaults(defineProps<LeadTitleProps>(), {
  label: '',
  size: 6
})

</script>

<style scoped>

</style>
