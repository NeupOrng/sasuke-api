import { Body, Controller, Get, Post, Put, UseGuards, Request, UseFilters } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import BaseApiResponse from "src/model/apiResponse";
import { ICategoryDto } from "src/model/mainRepository/categories/category";
import { AdminAuthGuard } from "src/guards/adminAuth.guard";
import { ExceptionsFilter } from "src/filters/exception.filter";

@Controller('product')
@ApiTags('Product')
@UseGuards(AdminAuthGuard)
@UseFilters(ExceptionsFilter)
export class ProductController {
  constructor(private readonly _productService: ProductService){}

  @Get('get-all-categories')
  @ApiResponse({ type: BaseApiResponse<Array<ICategoryDto>> })
  public async GetAllCategoies(): Promise<BaseApiResponse<Array<ICategoryDto>>> {
    return await this._productService.GetAllCategories()
  }

  @Post('create-category')
  @ApiResponse({ type: BaseApiResponse<Array<ICategoryDto>> })
  public async CreateCategory(@Body() request: { CategoryName: string}): Promise<BaseApiResponse<Array<ICategoryDto>>> {
    return await this._productService.CreateCategory(request.CategoryName)
  }

  @Put('edit-category-name')
  @ApiResponse({ type: BaseApiResponse<Array<ICategoryDto>> })
  public async UpdateCate(@Body() body: ICategoryDto, @Request() request): Promise<BaseApiResponse<Array<ICategoryDto>>> {
    return await this._productService.UpdateCategory(body, request.user.Username);
  }
}