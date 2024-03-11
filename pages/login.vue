<template>
  <div class="flex flex-row w-4/5 md:w-1/2 lg:w-2/3 items-center  mx-auto justify-center justify-items-center align-middle mt-20">
    <Card>
      <div class="space-y-6" action="#">
        <div class="flex w-full justify-center items-center">
          <img src="../assets/imgs/logo_alt.svg" class="w-20 text-center justify-center flex align-center self-center">
        </div>
        <h5 class="text-4xl font-bold text-gray-900 dark:text-white text-center my-5">Welcome to <br/> Dyno Menu</h5>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name="email" id="email"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                 placeholder="name@company.com" required>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
            password</label>
          <input type="password" name="password" id="password" placeholder="••••••••"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                 required>
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="remember" type="checkbox" value=""
                     class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                     required>
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
          <a href="#" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
        </div>
        <NuxtLink to="/dashboard">
          <Button :type="ButtonTypes.Primary" :label="'Sign In Now'" class="mt-5"/>
        </NuxtLink>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>

import Button from "../components/units/Button.vue";
import {ButtonTypes} from "../components/Constants";
import Card from "../components/units/Card.vue";
</script>

<style scoped>

</style>
