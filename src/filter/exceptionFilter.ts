import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { response } from "express";
import { DbException } from "src/exception/DbException";
import BaseApiResponse from "src/model/apiResponse";
import BaseResponse from "src/model/baseResponse";

@Catch(DbException)
export class DataBaseExceptionFilter extends BaseExceptionFilter {
  catch(exception: DbException, host: ArgumentsHost) {
    response
      .status(500)
      .json(
        new BaseApiResponse<null>(null, exception.Message, exception.ErrorCode)
      );
  }
}