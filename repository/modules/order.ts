import HttpFactory from "~/repository/factory";
import {IApiResponse} from "~/repository/models/appData";
import {IOrders} from "~/repository/models/ApiResponse";
import {KitchenStatus} from "~/repository/models/ApiResponse";
import {IKitchenStatus} from "~/repository/models/ApiResponse";
import {IOrder} from "~/repository/models/ApiResponse";


class OrdersModule extends HttpFactory {
    private RESOURCE = 'orders';

    async getAllOrders(branchId: string, kitchenStatus: KitchenStatus): Promise<IApiResponse<IOrders>> {
        return await this.call<IApiResponse<IOrders>>('GET', `/${this.RESOURCE}/branch/${branchId}?kitchenStatus=${kitchenStatus}`)
    }

    async getOrders(branchId: string,): Promise<IApiResponse<IOrders>> {
        return await this.call<IApiResponse<IOrders>>('GET', `/${this.RESOURCE}/branch/${branchId}`)
    }

    async updateKitchenStatus(orderId: string, kitchenStatus: IKitchenStatus): Promise<IApiResponse<IOrders>> {
        return await this.call<IApiResponse<IOrders>>('PATCH', `${this.RESOURCE}/${orderId}/kitchen-status`, kitchenStatus)
    }

    async createOrder(request: IOrder) {
        return await this.call<IOrder>('POST', `${this.RESOURCE}`, request)
    }

}

export default OrdersModule;
