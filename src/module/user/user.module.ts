import { Module } from "@nestjs/common";
import { UsersRepository } from "src/repository/mainRepository/tables/usersRepository.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, UsersRepository],
})
export class UserModule{}