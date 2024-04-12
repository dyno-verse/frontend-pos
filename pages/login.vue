<template>
  <div
      class="flex flex-row w-4/5 md:w-1/2 lg:w-2/3 items-center  mx-auto justify-center justify-items-center align-middle mt-20">
    <Card>
      <div class="space-y-6">
        <div class="flex w-full justify-center items-center">
          <img src="../assets/imgs/logo_alt.svg" class="w-20 text-center justify-center flex align-center self-center">
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name="email" id="email"
                 v-model="email"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                 placeholder="name@company.com" required>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
            password</label>
          <input type="password" name="password" id="password" placeholder="••••••••"
                 v-model="password"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                 required>
        </div>
        <Button
            @click="mySignInHandler({email:email, password:password})"
            :type="ButtonTypes.Primary" :label="'Sign In'" class="mt-5"/>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>

import Button from "../components/units/Button.vue";
import {ButtonTypes} from "../components/Constants";
import Card from "../components/units/Card.vue";
import {useAuth} from "@sidebase/nuxt-auth/dist/runtime/composables/local/useAuth";
import {signIn} from "next-auth/react";

const {$api} = useNuxtApp();
const email = ref('')
const password = ref('')
const snackbar = useSnackbar();


const mySignInHandler = async ({email, password}: { email: string, password: string }) => {
  const {error, url} = await signIn('credentials', {email, password, redirect: false})
  if (error) {
    // Do your custom error handling here
    snackbar.add({
      type: 'error',
      text: 'Sorry! Authentication failed'
    })
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(url, {external: true})
  }
}


definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/set-up',
  }
})


</script>

<style scoped>

</style>
