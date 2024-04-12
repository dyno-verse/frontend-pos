import HttpFactory from "~/repository/factory";
import {IApiResponse} from "~/repository/models/appData";
import {Iitem} from "~/repository/models/ApiResponse";


class UserModule extends HttpFactory {
    private RESOURCE = '/user';


    async getUser(): Promise<IApiResponse<Iitem>> {
        return await this.call<IApiResponse<Iitem>>('GET', `${this.RESOURCE}/profile`)
    }


}

export default UserModule;
