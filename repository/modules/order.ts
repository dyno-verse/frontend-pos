import HttpFactory from "~/repository/factory";
import {IApiResponse} from "~/repository/models/appData";
import {IOrders} from "~/repository/models/ApiResponse";
import {KitchenStatus} from "~/repository/models/ApiResponse";


class OrdersModule extends HttpFactory {
    private RESOURCE = 'orders';


    async getAllOrders(branchId: string, kitchenStatus: KitchenStatus): Promise<IApiResponse<IOrders>> {
        return await this.call<IApiResponse<IOrders>>('GET', `/${this.RESOURCE}/branch/${branchId}?kitchenStatus=${kitchenStatus}`)
    }


    // async getBusinessInfoById(id: string): Promise<IApiResponse<IBusinessInfo>> {
    //     return await this.call<IApiResponse<IBusinessInfo>>('GET', `${this.RESOURCE}/${id}`)
    // }
    //
    // async updateBusinessInfoById(id: string, data: IUpdateBusiness): Promise<IApiResponse<IBusinessInfo>> {
    //     return await this.call<IApiResponse<IBusinessInfo>>('PUT', `${this.RESOURCE}/${id}`, data)
    // }
    //
    // async updateBusinessInfoWithMedia(businessId: string, data: IUpdateBusiness): Promise<IApiResponse<IBusinessInfo>> {
    //     return await this.call<IApiResponse<IBusinessInfo>>('PUT', `${this.RESOURCE}/${businessId}/photo-upload`, data)
    // }
}

export default OrdersModule;
