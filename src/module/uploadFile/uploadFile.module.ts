import { Module } from "@nestjs/common";
import { UploadFileController } from "./uploadFile.controller";
import { UploadFileService } from "./uploadFile.service";
import MainRepository from "src/repository/mainRepository/mainRepository.service";

@Module({
  providers: [UploadFileService, MainRepository],
  controllers: [UploadFileController],
})
export class UploadFileModule{}