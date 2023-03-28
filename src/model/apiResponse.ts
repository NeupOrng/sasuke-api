import { ApiProperty } from "@nestjs/swagger";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";
import BaseResponse from "./baseResponse";

class BaseApiResponse<T> extends BaseResponse
{
  @ApiProperty({ name: "Data" })
  public Data: T & { [key: string]: any };;

  constructor(data: T, message: string, errorCode: EnumApiResponseCode) {
    super(message, errorCode);
    this.Data = data;
  }
}

export default BaseApiResponse;