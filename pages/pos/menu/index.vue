<template>
  <div class="w-screen static relative bg-white overscroll-none">
    <div class="grid grid-cols-10 justify-center gap-x-4 pt-16 relative h-screen overscroll-none">

      <div class="static col-span-2 overflow-y-auto border-r border-gray-200">

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

      <div class="col-span-5 h-screen bg-white relative flex flex-col">

        <div class="absolute top-0 left-0 z-10 right-0 mb-4 w-full mt-3">
          <div>
            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" id="search"
                     v-model="search"
                     class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                     placeholder="Search"/>
            </div>
          </div>

        </div>

        <div class="overflow-y-scroll mt-20">
          <div v-if="!isPending && ViewTypes.CATEGORIES === selectedViewType" class="grid grid-cols-3 gap-4">
            <!---category-->
            <div v-if="menuDetails.categories.length !== 0"
                 class="bg-gray-100 cursor-pointer rounded-lg p-5 text-center items-center justify-center flex flex-col"
                 :style="{backgroundColor:category.color}"
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
          <div v-else-if="!isItemsPending && ViewTypes.ITEMS === selectedViewType" class="grid grid-cols-3 gap-4">
            <!---Item-->
            <div v-if="items.length !== 0"
                 @click="addToCart(item)"
                 class="bg-white border-gray-100 border cursor-pointer rounded-lg text-center pb-5 items-center justify-center flex-col"
                 v-for="item in items">

              <div v-if="item.imageUrl !== null" class="rounded-t-lg bg-gray-100 w-full mb-2 p-2"
                   :style="{ backgroundColor:item.color}">
                <object :data="item.imageUrl"
                        :style="{objectFit: 'contain', height: '7rem' ,width: '100%'}"
                        class="object-cover z-10 text-center justify-center">
                </object>
              </div>
              <div v-else
                   :style="{height: '8rem' ,width: '100%', backgroundColor:item.color}"
                   class="relative px-5 inline-flex items-center bg-gray-50 justify-center rounded-t-lg mb-2 overflow-hidden">
                  <span
                      class="font-bold text-gray-800 text-3xl">{{
                      getFirstTwoCharacters(item.name)
                    }}</span>
              </div>

              <p class="text-center text-black text-2xs line-clamp-2">{{ item.name }}</p>
              <h5 class="text-center text-black text-sm  font-bold">{{ format('GHC', item.price) }}</h5>
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
            <div class="flex flex-row justify-between">
              <h2 class="text-lg">Order Details</h2>

              <button ref="cartDropdownMenu">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                </svg>
              </button>
            </div>
            <hr class="my-2">
          </div>

          <div class="overflow-y-scroll h-[450px]">
            <div class="flex flex-row justify-between items-center my-4" v-for="(cartItem, index) in cartItems">
              <div class="flex-col flex">
                <h3>{{ cartItem.name }}</h3>
                <p class="text-gray-400">x{{ cartItem.quantity }}</p>
              </div>
              <div class="flex flex-col items-end">
                <h3>{{ format('', cartItem.price * cartItem.quantity) }}</h3>

                <div class="flex-row flex space-x-4">
                  <button type="button"
                          @click="itemQuantityDecrease(index)"
                          class="text-white bg-red-50 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center">

                    <svg v-if="cartItem.quantity > 1" class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 12h14"/>
                    </svg>

                    <svg v-else class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>

                  </button>

                  <button type="button"
                          @click="itemQuantityIncrease(index)"
                          class="text-white bg-red-50 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center">
                    <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 12h14m-7 7V5"/>
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          </div>

          <div class="static bottom-0 left-0">
            <hr class="my-2">
            <div class="flex flex-row justify-between my-1">
              <p>Subtotal</p>
              <p>{{ format('GHC', getCartTotal()) }}</p>
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
              <p class="font-bold text-2xl">{{ format('GHC', getCartTotal()) }}</p>
            </div>
            <hr class="my-2">
            <div class="flex flex-row justify-center my-4 space-x-2">

              <div :class="createOrderModel.serviceType === ServiceTypes.DINE_IN ? 'bg-red-50' :'bg-gray-50'"
                   @click="selectServiceType(ServiceTypes.DINE_IN)"
                   class="p-5 w-1/2 text-center cursor-pointer flex flex-col items-center rounded-lg">

                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-width="2"
                        d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                </svg>

                <p>Eat In</p>
              </div>

              <div
                  @click="selectServiceType(ServiceTypes.TAKE_OUT)"
                  :class="createOrderModel.serviceType === ServiceTypes.TAKE_OUT ? 'bg-red-50' :'bg-gray-50'"
                  class="p-5 w-1/2 text-center cursor-pointer flex flex-col items-center rounded-lg">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z"/>
                </svg>

                <p>Takeout</p>
              </div>

            </div>

            <button type="button"
                    @click="createOrder()"
                    class="text-white bg-red-500 w-full font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2">
              Place Order
            </button>


          </div>

        </div>
      </div>
    </div>


    <!-- Dropdown menu -->
    <div id="dropdownDotsHorizontal"
         ref="cartDropdownId"
         class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
        <li>
          <a @click="openKitchenNoteModal()"
             class="block px-4 py-2 text-sm">Kitchen Note</a>
        </li>
      </ul>
      <div class="py-2">
        <a @click="deleteAllCartItems()"
           class="block px-4 py-2 text-sm text-red-700 cursor-pointer">
          Clear cart
        </a>
      </div>
    </div>


    <!---Kitchen Note Modal-->
    <div ref="kitchenNoteModalId" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Kitchen Note
            </h3>
            <button type="button"
                    @click="kitchenNoteModal.hide()"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Table
                  Number</label>
                <input type="number" v-model="createOrderModel.tableNumber" id="name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Type product name" required="">
              </div>

              <div class="col-span-2">
                <label for="description"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                <textarea id="description" rows="4"
                          v-model="createOrderModel.kitchenNote"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write a note to the kitchen"></textarea>
              </div>
            </div>
          </form>
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
import {IOrders, OrderItem} from "~/repository/models/ApiResponse";

definePageMeta({
  layout: "pos",
  middleware: "auth"
});
const {$api} = useNuxtApp();
const businessInfo = ref({} as IBusinessInfo)
const isMenusPending = ref(true)
const isItemsPending = ref(true)
const cartDropdown = ref({})
const cartDropdownMenu = ref(null)
const cartDropdownId = ref(null)
const isPending = ref(true)
const kitchenNoteModal = ref({})
const kitchenNoteModalId = ref(null)
const selectedCategoryId = ref('')
const selectedMenuId = ref('')
const businessId = '72f16ef5-6b78-4504-80bd-16aef1c52b46'
const branchId = '340328b2-cec0-4c5c-ba57-37a0f33dcf66'
const menus = ref([])
const items = ref([])
const cartItems = ref([])
const menuDetails = ref({} as IMenuDetail)
const snackbar = useSnackbar();
const router = useRouter()
const search = ref('')
const createOrderModel = ref({
  kitchenNote: '',
  orderItems: [],
  branchId: branchId,
  businessId: businessId,
  tableNumber: 1,
  serviceType: ServiceTypes.DINE_IN
})
import {format} from 'money-formatter';
import debounce from 'lodash.debounce'
import {Dropdown, DropdownOptions, Modal} from "flowbite";
import {ServiceTypes} from "~/repository/models/ApiResponse";


onMounted(() => {
  getBusinessById(businessId)

  // options with default values
  const options: DropdownOptions = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
    onHide: () => {
      console.log('dropdown has been hidden');
    },
    onShow: () => {
      console.log('dropdown has been shown');
    },
    onToggle: () => {
      console.log('dropdown has been toggled');
    },
  };

  cartDropdown.value = new Dropdown(cartDropdownId.value, cartDropdownMenu.value, options);
  kitchenNoteModal.value = new Modal(kitchenNoteModalId.value)

})

const openKitchenNoteModal = () => {
  kitchenNoteModal.value.show()
}

const enum ViewTypes {
  ITEMS,
  CATEGORIES
}

const selectedViewType = ref(ViewTypes.CATEGORIES)


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
  selectedViewType.value = ViewTypes.CATEGORIES
  selectedMenuId.value = menuId
  getDetailedMenu(menuId)
}

const selectServiceType = (serviceType: ServiceTypes) => {
  createOrderModel.value.serviceType = serviceType
}

watch(search, debounce(() => {
  searchItems(search.value)
}, 500))


const searchItems = (itemName: string) => {
  isItemsPending.value = true
  selectedViewType.value = ViewTypes.ITEMS
  $api.item.searchItems(branchId, itemName).then(data => {
    items.value = data.data
    isItemsPending.value = false
  }).catch(error => {
    isItemsPending.value = false
    // isMenuCategories.value = false
  })
}

const addToCart = (item: Iitem) => {
  const pos = returnItemPosition(item)
  if (pos < 0) {
    //Separate this
    item.quantity = 1
    cartItems.value.push(item)
  } else {
    itemQuantityIncrease(pos)
  }
}

// const
const getCartTotal = () => {
  let sum: number = 0;
  cartItems.value.forEach(a => sum += (a.price * a.quantity));
  return sum
}

function returnItemPosition(item: Iitem): number {
  return cartItems.value.findIndex(a => a.id === item.id)
}

const itemQuantityIncrease = (itemPosition: number) => {
  const theItem = (cartItems.value[itemPosition] as Iitem)
  if (theItem.quantity !== undefined) {
    theItem.quantity++
    cartItems.value.splice(itemPosition, 1, theItem)
  }

}

const itemQuantityDecrease = (itemPosition: number) => {
  const theItem = (cartItems.value[itemPosition] as Iitem)
  if (theItem.quantity !== undefined) {
    theItem.quantity--
    if (theItem.quantity <= 0) {
      deleteCartItem(itemPosition)
    } else {
      cartItems.value.splice(itemPosition, 1, theItem)
    }
  }
}

const deleteCartItem = (position: number) => {
  cartItems.value.splice(position, 1)
}

const deleteAllCartItems = () => {
  cartItems.value.length = 0

  cartDropdown.value.hide()
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
  isItemsPending.value = true
  selectedViewType.value = ViewTypes.ITEMS

  $api.category.getItemsUnderCategories(categoryId).then(data => {
    isItemsPending.value = false
    items.value = data.data.items
  }).catch(error => {
    isItemsPending.value = false

  });
}

const transformOrderItems = (cartItem: []): OrderItem[] => {
  const orderItems: OrderItem[] = []
  cartItems.value.forEach(item => {
    orderItems.push({
      itemId: item.id,
      quantity: item.quantity
    })
  })
  return orderItems
}

const createOrder = () => {
  // const data: IOrders = {
  //   kitchenNote: '',
  //   orderItems: ,
  //   branchId: branchId,
  //   businessId: businessId,
  //   tableNumber: 1
  // }

  createOrderModel.value.orderItems = transformOrderItems(cartItems.value)

  $api.order.createOrder(createOrderModel.value).then(data => {
    snackbar.add({
      type: 'success',
      text: 'Order created'
    })
    router.push(`/pos/orders/payment/${data.data.id}`)
  }).catch(error => {
    snackbar.add({
      type: 'error',
      text: error.data.errorMessages
    })
  })
}


</script>

<style scoped>

</style>
