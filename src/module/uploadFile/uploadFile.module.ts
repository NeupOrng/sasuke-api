import { Module } from "@nestjs/common";
import { UploadFileController } from "./uploadFile.controller";
import { UploadFileService } from "./uploadFile.service";
import { UsersRepository } from "src/repository/mainRepository/tables/usersRepository.service";

@Module({
  providers: [UploadFileService, UsersRepository],
  controllers: [UploadFileController],
})
export class UploadFileModule{}