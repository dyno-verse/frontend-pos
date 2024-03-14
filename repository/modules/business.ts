import HttpFactory from "~/repository/factory";
import {IBusinessInfo} from "~/repository/models/ApiResponse";
import {IApiResponse} from "~/repository/models/appData";

class BusinessModule extends HttpFactory {
    private RESOURCE = 'business';

    async getBusinessInfoById(id: string): Promise<IApiResponse<IBusinessInfo>> {
        return await this.call<IApiResponse<IBusinessInfo>>('GET', `${this.RESOURCE}/${id}`)
    }
}

export default BusinessModule;
