import { Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  UseFilters,
  Body
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UploadFileService } from "./uploadFile.service";
import { ApiTags } from "@nestjs/swagger";
import { CustomerAuthGuard } from "src/guards/customerAuth.guard";
import { ExceptionsFilter } from "src/filters/exception.filter";
import { IUploadProductImageRequest } from "./model/uploadProductImageRequest";
import BaseApiResponse from "src/model/apiResponse";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";

@Controller('uploadFile')
@ApiTags('FileUpload')
@UseFilters(ExceptionsFilter)
export class UploadFileController {
  constructor(private readonly _uploadFileService: UploadFileService) {}

  @UseGuards(CustomerAuthGuard)
  @Post('user-profile')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets/users',
      filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const generatedFilename = `${originalName}-${timestamp}${fileExtName}`;
        cb(null, generatedFilename);
      },
    }),
  }))
  async UpdateUserProfile(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'jpeg' })
      .addMaxSizeValidator({ maxSize: 510000 })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) file: Express.Multer.File, @Request() request)
  {
    return await this._uploadFileService.UpdateUserProfile(file.path, request.user.Username);
  }

  @Post('upload-product-image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets/productImages',
      filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const generatedFilename = `${originalName}-${timestamp}${fileExtName}`;
        cb(null, generatedFilename);
      },
    }),
  }))
  UploadProductImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'jpeg' })
      .addFileTypeValidator({ fileType: 'jpg' })
      .addFileTypeValidator({ fileType: 'png' })
      .addMaxSizeValidator({ maxSize: 10000 })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) file: Express.Multer.File)
  {
    return new BaseApiResponse<string>(file.path, EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }
}