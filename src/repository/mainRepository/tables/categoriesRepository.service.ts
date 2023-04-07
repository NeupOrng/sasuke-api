import { Injectable } from "@nestjs/common";
import BaseRepository from "../../baseRepository";
import { ConfigService } from "@nestjs/config";
import { ICategoryDto } from "src/model/mainRepository/categories/category";
import { DbException } from "src/exception/DbException";
import { Sql } from "@prisma/client/runtime";
import { UsersRepository } from "./usersRepository.service";
import { resourceUsage } from "process";


@Injectable()
export class CategoriesRepository extends BaseRepository {

  constructor(
    private _configService: ConfigService
  )
  {
    super(_configService.get('MAIN_DATABASE_URL'))
  }

  async GetAllCategories(): Promise<Array<ICategoryDto>> {
    try {
      const categories = await this.categories.findMany()

      return categories.map((category) => {
        const newCategory: ICategoryDto = {
          CategoryId: category.CategoryId,
          CategoryName: category.CategoryName,
        };
        return newCategory;
      })
    }
    catch(ex) {
      throw new DbException(ex);
    }
  }

  async CreateCategory(categoryName: string): Promise<Array<ICategoryDto>> {
    try {
      await this.categories.create({
        data: {
          CategoryName: categoryName,
          CreatedBy: "Admin",
          ModifiedBy: "Admin"
        }
      });
      return this.GetAllCategories();
    }
    catch(ex) {
      throw new DbException(ex);
    }
  }

  async UpdateCategory(category: ICategoryDto, username: string): Promise<Array<ICategoryDto>>{
    try {
      const result = await this.categories.update({
        where: {
          CategoryId: category.CategoryId
        },
        data: {
          CategoryName: category.CategoryName,
          ModifiedBy: username,
          ModifiedOn: new Date(),
        }
      });
      return this.GetAllCategories();
    }
    catch(ex) {
      throw new DbException(ex);
    }
  }
}