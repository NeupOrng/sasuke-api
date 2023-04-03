import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserReqeust, CustomerSignInRequest } from "./model";
import BaseApiResponse from "src/model/apiResponse";
import { UserDto, UserDtoResponse } from "src/model/mainRepository";

@Controller('api/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private _authService: AuthService) { }

  @Post('signup')
  @ApiBody({ type: CreateUserReqeust })
  @ApiResponse({ type: BaseApiResponse<UserDtoResponse>})
  public async SignUp(@Body() request: CreateUserReqeust): Promise<BaseApiResponse<UserDtoResponse>> {
    return await this._authService.Signup(request);
  }

  @Post('login')
  @ApiBody({ type: CustomerSignInRequest })
  @ApiResponse({ type: BaseApiResponse<UserDtoResponse>})
  public async Login(@Body() request: CustomerSignInRequest): Promise<BaseApiResponse<UserDtoResponse>> {
    return await this._authService.CustomerLogin(request);
  }
}