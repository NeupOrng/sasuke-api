import { Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { AuthGuard } from "src/guards/auth.guard";
import { UploadFileService } from "./uploadFile.service";

@Controller('uploadFile')
export class UploadFileController {
  constructor(private readonly _uploadFileService: UploadFileService) {}

  @UseGuards(AuthGuard)
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
}