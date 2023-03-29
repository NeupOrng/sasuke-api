import { Injectable } from "@nestjs/common";
import { CreateUserReqeust, CustomerSignInRequest } from "./model";
import HashService from "src/utils/hash/hash.service";
import { CreateUserDto, UserDto } from "src/model/mainRepository";
import MainRepository from "src/repository/mainRepository/mainRepository.service";
import BaseApiResponse from "src/model/apiResponse";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";

@Injectable()
export class AuthService {

  public constructor (
    private _hashService: HashService,
    private _mainRepository: MainRepository
    ){}

  public async CustomerLogin(request: CustomerSignInRequest): Promise<BaseApiResponse<UserDto>>{
    const targetUser = await this._mainRepository.SignInUser(request);
    if (targetUser === null) return new BaseApiResponse<UserDto>(null, EnumApiResponseMessage.NoUser, EnumApiResponseCode.NoUser);
    
    if(!await this._hashService.Compare(request.Password, targetUser.Password)) return new BaseApiResponse<UserDto>(
      null,
      EnumApiResponseMessage.IncorrectPawssword,
      EnumApiResponseCode.IncorrectPawssword
      );
    
    return new BaseApiResponse<UserDto>(new UserDto(targetUser), EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }


  public async Signup(dto: CreateUserReqeust): Promise<BaseApiResponse<null>> {
    const currentDate = new Date();
    const createuserDto = new CreateUserDto(
      dto.Username,
      dto.Email,
      await this._hashService.Hash(dto.Password),
      dto.Username,
      currentDate,
      dto.Username,
      currentDate,
    );
    return this._mainRepository.CreateUser(createuserDto)
  }
}