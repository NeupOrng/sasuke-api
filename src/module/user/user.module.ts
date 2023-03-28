import { Module } from "@nestjs/common";
import MainRepository from "src/repository/mainRepository/mainRepository.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, MainRepository],
})
export class UserModule{}