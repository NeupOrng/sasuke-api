import { InternalServerErrorException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";

export class DbException extends InternalServerErrorException {
  public ErrorCode: EnumApiResponseCode;
  public Message: string;

  public constructor(exception: PrismaClientKnownRequestError) {
    super(exception)
    this.ErrorCode = EnumApiResponseCode.InternalError;
    this.Message = EnumApiResponseMessage.DbError;
  }
}