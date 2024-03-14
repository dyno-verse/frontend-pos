import HttpFactory from "~/repository/factory";
import {IMenuDetail} from "~/repository/models/ApiResponse";
import {IApiResponse} from "~/repository/models/appData";
import {Iitem} from "~/repository/models/ApiResponse";


class ItemModule extends HttpFactory {
    private RESOURCE = '/item';

    // 'https://api.dynomenu.com/item/branch/340328b2-cec0-4c5c-ba57-37a0f33dcf66?itemName=agor' \


    async searchItems(branchId: string, itemName: string): Promise<IApiResponse<Iitem>> {
        return await this.call<IApiResponse<Iitem>>('GET', `${this.RESOURCE}/branch/${branchId}?itemName=${itemName}`)
    }


}

export default ItemModule;
