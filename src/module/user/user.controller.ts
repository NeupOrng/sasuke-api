import { Controller, Get, UseFilters } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import BaseApiResponse from "src/model/apiResponse";
import { UserDto } from "src/model/mainRepository";
import { UserService } from "./user.service";
import { ExceptionsFilter } from "src/filters/exception.filter";

@Controller('user')
@ApiTags('User')
@UseFilters(ExceptionsFilter)
export class UserController {
  constructor(private _userService: UserService){}

  @Get('get-all-user')
  @ApiResponse({ type: BaseApiResponse<Array<UserDto>> })
  public async GetAllUsers(): Promise<BaseApiResponse<UserDto[]>> {
    return await this._userService.GetAllUsers();
  }
}