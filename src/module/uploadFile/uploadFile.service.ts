import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";
import BaseResponse from "src/model/baseResponse";
import MainRepository from "src/repository/mainRepository/mainRepository.service";


@Injectable()
export class UploadFileService {
  constructor(private readonly _mainRepository: MainRepository) {}

  public async UpdateUserProfile(imagePath: string, username: string): Promise<BaseResponse> {
    const targetUser = await this._mainRepository.GetUserByUsername(username);
    if(targetUser === null) return new BaseResponse('cannot find user in db', EnumApiResponseCode.NoUser);
    targetUser.Profile = imagePath;
    
    const updatedUser = await this._mainRepository.UpdateUser(targetUser);
    if(updatedUser === null) return new BaseResponse('update profile not success', EnumApiResponseCode.InternalError);

    return new BaseResponse(EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }
}