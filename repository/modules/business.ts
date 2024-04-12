import HttpFactory from "~/repository/factory";
import {IBusinessInfo} from "~/repository/models/ApiResponse";
import {IApiResponse} from "~/repository/models/appData";

class BusinessModule extends HttpFactory {
    private RESOURCE = 'business';

    async getBusinessInfoById(id: string): Promise<IApiResponse<IBusinessInfo>> {
        return await this.call<IApiResponse<IBusinessInfo>>('GET', `${this.RESOURCE}/${id}`)
    }

    // 'https://api.dynomenu.com/business/user/d1a4503d-6275-4c30-ab10-2da81488df28' \

    async getUserBusinesses(userId: string): Promise<IApiResponse<IBusinessInfo>> {
        return await this.call<IApiResponse<IBusinessInfo>>('GET', `${this.RESOURCE}/user/${userId}`)
    }
}

export default BusinessModule;
