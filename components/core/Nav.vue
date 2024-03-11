<template>
  <div class="w-full py-5 px-5 mt-2">
    <!--Desktop-->
    <div class="flex justify-between items-center md:visible 2xl:visible xl:visible sm:visible visible">
      <div class="flex flex-row items-center space-x-5">
        <NuxtLink to="/"><img src="/imgs/logo.svg" class="w-14" alt="Dynomenu logo"/></NuxtLink>
        <NuxtLink to="/" active-class="font-bold text-red-500">What's dyno
          menu?
        </NuxtLink>
        <NuxtLink to="/pricing" active-class="text-red-500 font-bold">Products</NuxtLink>
        <NuxtLink to="/pricing" active-class="text-red-500 font-bold">Pricing</NuxtLink>
        <NuxtLink to="/pricing" active-class="text-red-500 font-bold">Solutions</NuxtLink>
      </div>
      <div class="flex justify-end flex-row">
        <div
            class="flex flex-row gap-x-5 items-center md:visible 2xl:visible xl:visible md:visible sm:invisible invisible">
          <!--          <p>EN <i class="fa-solid fa-caret-down"></i></p>-->
          <Button label="Log In" :type="ButtonTypes.Secondary"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

import Button from "~/components/units/Button.vue";
import {ButtonTypes} from "~/components/Constants";
</script>

<style scoped>

</style>
