import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserReqeust, CustomerSignInRequest } from "./model";
import { CreateUserDto, UserDto, UserDtoResponse } from "src/model/mainRepository";
import MainRepository from "src/repository/mainRepository/mainRepository.service";
import BaseApiResponse from "src/model/apiResponse";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";
import { IHashService } from "src/utils/interface/hash.interface";
import HashService from "src/utils/hash.utils";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "src/model/jwt.model";
import { Users } from "@prisma/client";

@Injectable()
export class AuthService {
  private readonly _hashService: IHashService;
  private readonly _jwtService: JwtService

  public constructor (
    private readonly _mainRepository: MainRepository,
    jwtService: JwtService,
    hashService: HashService
    ){
      this._hashService = hashService;
      this._jwtService = jwtService;
    }

  public async CustomerLogin(request: CustomerSignInRequest): Promise<BaseApiResponse<UserDtoResponse>>{
    const targetUser = await this._mainRepository.SignInUser(request);
    if (targetUser === null) throw new NotFoundException({ Message: 'User Not Found '});
    if(!await this._hashService.Compare(request.Password, targetUser.Password)) throw new UnauthorizedException({ Message: 'Incorrect Password' });

    const payload = this.GetJwtPayload(targetUser);

    const token = await this._jwtService.signAsync(payload, {
      expiresIn: 10 * 60 * 1000
    });

    console.log(token);

    return new BaseApiResponse<UserDtoResponse>(new UserDtoResponse(targetUser, token), 
      EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }


  public async Signup(dto: CreateUserReqeust): Promise<BaseApiResponse<UserDtoResponse>> {
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
    const newUser = await this._mainRepository.CreateUser(createuserDto)
  
    const payload = this.GetJwtPayload(newUser);

    return new BaseApiResponse<UserDtoResponse>(new UserDtoResponse(newUser, await this._jwtService.signAsync(payload)), 
    EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
  }

  private GetJwtPayload(user: Users): IJwtPayload
  {
    const payload: IJwtPayload = {
      Username: user.Username,
      UserId: user.UserId,
      Status: user.Status
    }

    return payload;
  }
}