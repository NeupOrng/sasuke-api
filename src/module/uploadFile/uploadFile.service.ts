import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";
import BaseResponse from "src/model/baseResponse";
import { UsersRepository } from "src/repository/mainRepository/tables/usersRepository.service";
import { IUploadProductImageRequest } from "./model/uploadProductImageRequest";


@Injectable()
export class UploadFileService {
  constructor(private readonly _userRepository: UsersRepository) {}

  public async UpdateUserProfile(imagePath: string, username: string): Promise<BaseResponse> {
    const targetUser = await this._userRepository.GetUserByUsername(username);

    if(targetUser === null) return new BaseResponse('cannot find user in db', EnumApiResponseCode.NoUser);

    targetUser.Profile = imagePath;
    
    const updatedUser = await this._userRepository.UpdateUser(targetUser);
    if(updatedUser === null) return new BaseResponse('update profile not success', EnumApiResponseCode.InternalError);

    return new BaseResponse(EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }

  public async AddProductImage(imagePath: string, request: IUploadProductImageRequest, username: string): Promise<BaseResponse> {
    const targetUser = await this._userRepository.GetUserByUsername(username);
    
    if(targetUser === null) return new BaseResponse('cannot find user in db', EnumApiResponseCode.NoUser);

    targetUser.Profile = imagePath;
    
    const updatedUser = await this._userRepository.UpdateUser(targetUser);
    if(updatedUser === null) return new BaseResponse('update profile not success', EnumApiResponseCode.InternalError);

    return new BaseResponse(EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }
}