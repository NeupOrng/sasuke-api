import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { CategoriesRepository } from "src/repository/mainRepository/tables";

@Module({
  providers: [ProductService, CategoriesRepository],
  controllers: [ProductController],
})
export class ProductModule{}