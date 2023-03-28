import { Injectable } from "@nestjs/common";
import BaseApiResponse from "src/model/apiResponse";
import BaseResponse from "src/model/baseResponse";
import { UserDto } from "src/model/mainRepository";
import MainRepository from "src/repository/mainRepository/mainRepository.service";


@Injectable()
export class UserService {
  constructor(private _mainRepository: MainRepository) {}

  public GetAllUsers(): Promise<BaseApiResponse<Array<UserDto>>> {
    return this._mainRepository.GetAllUsers();
  }
}