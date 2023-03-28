import { ApiProperty } from '@nestjs/swagger';
import {
  EnumApiResponseCode,
  EnumApiResponseMessage,
} from '../enum/enumResponseMessage';

class BaseResponse {
  @ApiProperty({ name: "Message" })
  public Message: string;

  @ApiProperty({ name: "ErrorCode" })
  public ErrorCode: EnumApiResponseCode;

  public constructor(message: string, errorCode: EnumApiResponseCode)
  {
    this.ErrorCode = errorCode;
    this.Message = message;
  }
}


export default BaseResponse;