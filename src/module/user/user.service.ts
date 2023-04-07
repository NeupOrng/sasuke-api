import { Injectable } from "@nestjs/common";
import BaseApiResponse from "src/model/apiResponse";
import BaseResponse from "src/model/baseResponse";
import { UserDto } from "src/model/mainRepository";
import { UsersRepository } from "src/repository/mainRepository/tables";


@Injectable()
export class UserService {
  constructor(private _userRepository: UsersRepository) {}

  public GetAllUsers(): Promise<BaseApiResponse<Array<UserDto>>> {
    return this._userRepository.GetAllUsers();
  }
}