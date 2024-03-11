// @ts-ignore
import {defineNuxtPlugin} from '#app';
// @ts-ignore
import {$fetch, FetchOptions} from "ofetch";
import OrdersModule from "../repository/modules/order";


/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    order: OrdersModule,
}

// @ts-ignore
export default defineNuxtPlugin(nuxtApp => {

    const fetchOptions: { headers: { Authorization: string; Accept: string }; baseURL: string } = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic Y3ZiZGZqeWU1dHdmZHM6NTY3ODY3MzZ0d2VoZGdkZmdzZGY='
        },
        baseURL: "https://api.dynomenu.com",
    }

    /** create a new instance of $fetcher with custom option */
    const apiFetcher = $fetch.create(fetchOptions);

    /** an object containing all repositories we need to expose */
    const modules: IApiInstance = {
        order: new OrdersModule(apiFetcher),
    };

    return {
        provide: {
            api: modules,
        },
    };
});
