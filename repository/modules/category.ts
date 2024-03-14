import HttpFactory from "~/repository/factory";
import {IBusinessInfo, IMenu, IMenuCategory, ICategoryItems} from "~/repository/models/ApiResponse";
import {IApiResponse} from "~/repository/models/appData";
import {ICreateCategoryItem} from "~/repository/models/inputModels";
import {ICreateCategory} from "~/repository/models/inputModels";

class CategoryModule extends HttpFactory {
    private RESOURCE = '/category';

    // https://api.dynomenu.com/category/81ea466d-a1e6-4625-bea6-a29bb73c8add/detailed

    async getMenuCategoriesByBusinessId(id: string) {
        return await this.call<IMenuCategory>('GET', `${this.RESOURCE}/${id}`)
    }


    async getItemsUnderCategories(categoryId: string): Promise<IApiResponse<ICategoryItems>> {
        // @ts-ignore
        return await this.call<ICategoryItems>('GET', `${this.RESOURCE}/${categoryId}/detailed`)
    }

    async addItem(categoryId: string, request: ICreateCategoryItem) {
        return await this.call<ICreateCategoryItem>('POST', `${this.RESOURCE}/${categoryId}/menu-item`, request)
    }
}

export default CategoryModule;
