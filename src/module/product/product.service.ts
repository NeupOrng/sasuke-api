import { Injectable } from "@nestjs/common";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";
import BaseApiResponse from "src/model/apiResponse";
import { ICategoryDto } from "src/model/mainRepository/categories/category";
import { CategoriesRepository } from "src/repository/mainRepository/tables";


@Injectable()
export class ProductService {
  constructor(
    private readonly _categoriesRepositories: CategoriesRepository
    ) {}

  async GetAllCategories(): Promise<BaseApiResponse<Array<ICategoryDto>>> {
    const categories = await this._categoriesRepositories.GetAllCategories();
    return new BaseApiResponse(categories, EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }

  async CreateCategory(request: string): Promise<BaseApiResponse<Array<ICategoryDto>>> {
    const categories = await this._categoriesRepositories.CreateCategory(request);
    return new BaseApiResponse(categories, EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }

  async UpdateCategory(request: ICategoryDto, username: string): Promise<BaseApiResponse<Array<ICategoryDto>>> {
    const categories = await this._categoriesRepositories.UpdateCategory(request, username);
    return new BaseApiResponse(categories, EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }
}