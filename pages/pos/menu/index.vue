<template>
  <div class="w-screen bg-white">
    <div class="grid grid-cols-10 justify-center gap-x-4 pt-16 mt-2">

      <div class="static col-span-2 h-full overflow-y-auto border-r border-gray-200 ">

        <div v-if="!isMenusPending"
             class="bg-gray-50 rounded-r-lg px-5 py-6 mb-2 cursor-pointer"
             :class="[ selectedMenuId === menu.id ? 'bg-red-50  border-l-4 border-red-500 font-bold' : 'bg-gray-50']"
             v-for="menu in menus" @click="selectMenu(menu.id)">
          <p class="text-gray-800 text-lg">{{ menu.name }}</p>
        </div>

        <div v-else class="w-full my-48">
          <Loader/>
        </div>

      </div>

      <div class="col-span-5 h-full bg-white overflow-y-auto">
        <div class="mb-4 mt-2">

          <form>
            <label for="search" class="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" id="search"
                     class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Search" required/>
            </div>
          </form>

        </div>
        <div>


          <div v-if="!isPending && isMenuCategories" class="grid grid-cols-3 gap-4">
            <!---category-->
            <div v-if="menuDetails.categories.length !== 0"
                 class="bg-gray-100 cursor-pointer rounded-lg p-5 text-center items-center justify-center flex flex-col"
                 v-for="category in menuDetails.categories" @click="getItemsByCategory(category.id)">

              <svg class="w-6 h-6 text-gray-800 dark:text-white self-end" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg"
                   width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                      d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
              </svg>

              <p class="mb-10 mt-2">{{ category.name }}</p>
            </div>
            <div v-else class="w-full col-span-3">
              <EmptyState/>
            </div>
          </div>
          <div v-else-if="!isItemsPending && !isMenuCategories" class="grid grid-cols-3 gap-4">
            <!---Item-->
            <div v-if="items.length !== 0"
                 @click="addToCart(item)"
                 class="bg-white border-gray-100 border cursor-pointer rounded-lg p-5 text-center items-center justify-center flex flex-col"
                 v-for="item in items">

              <img v-if="item.imageUrl !== null" :src="item.imageUrl" class="w-32 h-32"/>
              <div v-else
                   class="relative  inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-900 rounded-full dark:bg-gray-600">
                  <span
                      class="font-medium text-gray-100 text-3xl dark:text-gray-300">{{
                      getFirstTwoCharacters(item.name)
                    }}</span>
              </div>

              <p class="text-center text-black text-lg">{{ item.name }}</p>
              <h5 class="text-center text-black text-sm  font-extrabold">GHS {{ item.price }}</h5>
            </div>
            <div v-else class="w-full col-span-3">
              <EmptyState/>
            </div>
          </div>
          <div v-else>
            <Loader/>
          </div>

          <div>

          </div>

        </div>
      </div>

      <div class="relative right-0 col-span-3 h-full border-l overflow-y-auto">
        <div class="p-5">
          <div class="">
            <h2 class="text-lg">Order Details</h2>
            <hr class="my-2">
          </div>

          <div class="overflow-y-scroll h-[450px]">
            <div class="flex flex-row justify-between items-center my-4" v-for="(cartItem, index) in cartItems">
              <div class="flex-col flex">
                <h3>{{ cartItem.name }}</h3>
                <p>Quantity: {{ cartItem.quantity }}</p>
              </div>
              <div class="flex flex-col items-end">
                <h3>GHS {{ cartItem.price * cartItem.quantity }}</h3>

                <svg class="cursor-pointer w-6 h-6 text-gray-500" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     @click="deleteCartItem(index)"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>

              </div>
            </div>
          </div>

          <div class="static bottom-0 left-0">
            <hr class="my-2">
            <div class="flex flex-row justify-between my-1">
              <p>Subtotal</p>
              <p>GHS {{ getCartTotal() }}</p>
            </div>
            <div class="flex flex-row justify-between my-1">
              <p>Tax Total</p>
              <p>GHS 0</p>
            </div>
            <div class="flex flex-row justify-between my-1">
              <p>Discount</p>
              <p>GHS 0</p>
            </div>
            <div class="flex flex-row justify-between my-1">
              <p class="font-bold text-2xl">Total</p>
              <p class="font-bold text-2xl">GHS {{ getCartTotal() }}</p>
            </div>
            <hr class="my-2">
            <div class="flex flex-row justify-center my-4 space-x-2">
              <div class="bg-red-50 p-5 w-1/2 text-center flex flex-col items-center rounded-lg">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-width="2"
                        d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                </svg>

                <p>Eat In</p>
              </div>

              <div class="bg-gray-50 p-5 w-1/2 text-center flex flex-col items-center rounded-lg">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z"/>
                </svg>

                <p>Takeout</p>
              </div>
            </div>

            <NuxtLink to="/pos/orders/payment">
              <button type="button"
                      class="focus:outline-none text-white bg-red-500 w-full hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Place Order
              </button>
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IBusinessInfo} from "~/repository/models/ApiResponse";
import Loader from "~/components/units/Loader.vue";
import {IMenuDetail} from "~/repository/models/ApiResponse";
import {Iitem} from "~/repository/models/ApiResponse";

definePageMeta({
  layout: "pos",
});
const {$api} = useNuxtApp();
const businessInfo = ref({} as IBusinessInfo)
const isMenusPending = ref(true)
const isItemsPending = ref(true)
const isPending = ref(true)
const selectedCategoryId = ref('')
const selectedMenuId = ref('')
const businessId = '72f16ef5-6b78-4504-80bd-16aef1c52b46'
const menus = ref([])
const items = ref([])
const cartItems = ref([])
const isMenuCategories = ref(true)
const menuDetails = ref({} as IMenuDetail)


onMounted(() => {
  getBusinessById(businessId)
})

function getFirstTwoCharacters(sentence: string): string {
  const words = sentence.split(' ');

  if (words.length >= 2) {
    const firstWord = words[0].slice(0, 1);
    const secondWord = words[1].slice(0, 1);
    return `${firstWord}${secondWord}`.toUpperCase();
  } else {
    return words[0].slice(0, 2).toUpperCase();
  }
}


const getBusinessById = (id: string) => {
  isMenusPending.value = true;
  $api.business.getBusinessInfoById(id).then(data => {
    businessInfo.value = data.data
    menus.value = businessInfo.value.branches[0].menu

    //Select first menu in the list
    selectMenu(menus.value[0].id)
    isMenusPending.value = false

  }).catch(error => {
    isMenusPending.value = false

  })
}

const selectMenu = (menuId: string) => {
  isMenuCategories.value = true
  selectedMenuId.value = menuId
  getDetailedMenu(menuId)
}

const searchItems = (itemName: string) => {
  $api.item.searchItems('').then(data => {
    console.log(data.data)
  }).catch(error => {

  })
}

const addToCart = (item: Iitem) => {
  const pos = cartItems.value.findIndex(a => a.id === item.id)
  if (pos < 0) {
    item.quantity = 1
    cartItems.value.push(item)
  } else {
    const theItem = cartItems.value[pos]
    theItem.quantity++
    cartItems.value.splice(pos, 1, theItem)
  }
}

// const
const getCartTotal = () => {
  let sum: number = 0;
  cartItems.value.forEach(a => sum += (a.price * a.quantity));
  return sum
}

const deleteCartItem = (position: number) => {
  cartItems.value.splice(position, 1)
}

const getDetailedMenu = (menuId: string, categoryId?: string) => {
  isPending.value = true
  $api.menu.getMenusDetailsById(menuId).then(data => {
    menuDetails.value = data.data;
    isPending.value = false;
  }).catch(error => {
    isPending.value = false;

  })
}

const getItemsByCategory = (categoryId: string) => {
  isMenuCategories.value = false
  isItemsPending.value = true

  // selectedCategoryId.value = categoryId
  // categoryItems.value.items = []

  $api.category.getItemsUnderCategories(categoryId).then(data => {
    isItemsPending.value = false

    console.log(data.data)
    items.value = data.data.items
  }).catch(error => {
    isItemsPending.value = false

    // iscCategoryItemsLoading.value = false;
  });
}


</script>

<style scoped>

</style>
