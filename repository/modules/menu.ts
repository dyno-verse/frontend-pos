import HttpFactory from "~/repository/factory";
import {IBusinessInfo, IMenu} from "~/repository/models/ApiResponse";
import {IMenuDetail} from "~/repository/models/ApiResponse";
import {IApiResponse} from "~/repository/models/appData";
import {ICreateMenu, ICreateCategory} from "~/repository/models/inputModels";
import {ICreateCategoryItem} from "~/repository/models/inputModels";

class MenuModule extends HttpFactory {
    private RESOURCE = '/menu';

    async create(request: ICreateMenu): Promise<IApiResponse<ICreateMenu>> {
        return await this.call<IApiResponse<ICreateMenu>>('POST', `${this.RESOURCE}`, request);
    }

    async addItemUnderMenu(menuId: string, request: ICreateCategoryItem): Promise<IApiResponse<ICreateCategoryItem>> {
        return await this.call<IApiResponse<ICreateCategoryItem>>('POST', `${this.RESOURCE}/${menuId}/menu-item`, request)
    }

    async deleteMenu(menuId: string) {
        return await this.call<IApiResponse<ICreateMenu>>('DELETE', `${this.RESOURCE}/${menuId}`);
    }


    async getMenusByBusinessId(id: string) {
        return await this.call<IMenu>('GET', `${this.RESOURCE}/${id}`)
    }

    async updateMenu(menuId: string, request: ICreateMenu): Promise<IApiResponse<IMenu>> {
        return await this.call<IApiResponse<IMenu>>('PUT', `${this.RESOURCE}/${menuId}`, request);
    }


    async getMenusDetailsById(id: string): Promise<IApiResponse<IMenuDetail>> {
        return await this.call<IApiResponse<IMenuDetail>>('GET', `${this.RESOURCE}/${id}/detailed`)
    }

    async createCategoryUnderMenu(request: ICreateCategory, menuId: string) {
        return await this.call<ICreateCategory>('POST', `${this.RESOURCE}/${menuId}/category`, request);
    }


}

export default MenuModule;
