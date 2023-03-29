import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserReqeust, CustomerSignInRequest } from "./model";
import BaseApiResponse from "src/model/apiResponse";
import { UserDto } from "src/model/mainRepository";
import { DataBaseExceptionFilter } from "src/filter/exceptionFilter";

@Controller('auth')
@ApiTags('Authentication')
@UseFilters(new DataBaseExceptionFilter())
export class AuthController {
  constructor(private _authService: AuthService) { }

  @Post('signup')
  @ApiBody({ type: CreateUserReqeust })
  @ApiResponse({ type: BaseApiResponse<null>})
  public async SignUp(@Body() request: CreateUserReqeust): Promise<BaseApiResponse<null>> {
    return await this._authService.Signup(request);
  }

  @Post('login')
  @ApiBody({ type: CustomerSignInRequest })
  @ApiResponse({ type: BaseApiResponse<UserDto>})
  public async Login(@Body() request: CustomerSignInRequest): Promise<BaseApiResponse<UserDto>> {
    return await this._authService.CustomerLogin(request);
  }
}