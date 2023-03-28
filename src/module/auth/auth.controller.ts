import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserReqeust } from "./model";
import BaseResponse from "src/model/baseResponse";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";
import BaseApiResponse from "src/model/apiResponse";

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private _authService: AuthService) { }

  @Post('signup')
  @ApiBody({ description: 'Create New User', type: CreateUserReqeust })
  @ApiResponse({ type: BaseApiResponse<null>})
  @ApiResponse({ type: BaseResponse })
  public async signup(@Body() request: CreateUserReqeust): Promise<BaseApiResponse<null>> {
    return await this._authService.Signup(request);
  }
}