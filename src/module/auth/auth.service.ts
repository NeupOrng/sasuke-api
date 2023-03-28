import { Injectable } from "@nestjs/common";
import { CreateUserReqeust } from "./model";
import HashService from "src/utils/hash/hash.service";
import { CreateUserDto } from "src/model/mainRepository";
import MainRepository from "src/repository/mainRepository/mainRepository.service";
import BaseApiResponse from "src/model/apiResponse";

@Injectable()
export class AuthService {

  public constructor (
    private _hashService: HashService,
    private _mainRepository: MainRepository
    ){}

  public async signin(dto: CreateUserReqeust) {
    return {
      Data: 'user',
      Message: 'success'
    };
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