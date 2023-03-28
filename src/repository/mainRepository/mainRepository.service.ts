import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import BaseRepository from "../baseRepository";
import { CreateUserDto, UserDto } from "src/model/mainRepository";
import BaseApiResponse from "src/model/apiResponse";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
class MainRepository extends BaseRepository
{
  constructor(_configService: ConfigService)
  {
    super(_configService.get('MAIN_DATABASE_URL'))
  }

  public async CreateUser(createUserDto: CreateUserDto): Promise<BaseApiResponse<null>>
  {
    try {
      const newUser = await this.users.create( {
        data: {
          Username: createUserDto.Username,
          Email: createUserDto.Email,
          Password: createUserDto.Password,
          CreatedBy: createUserDto.CreatedBy,
          CreatedOn: createUserDto.CreatedOn,
          ModifiedBy: createUserDto.ModifiedBy,
          ModifiedOn: createUserDto.ModifiedOn
        }
      });
      return new BaseApiResponse<null>(null, EnumApiResponseMessage.Success, EnumApiResponseCode.Success)
    }
    catch(ex) {
      if(ex instanceof PrismaClientKnownRequestError)
      {
        if(ex.code === 'P2002') {
          return new BaseApiResponse<null>(null, `${EnumApiResponseMessage.DuplicateOn}${ex.meta.target}`, EnumApiResponseCode.DuplicateUser);
        }
      }
      return new BaseApiResponse<null>(null, EnumApiResponseMessage.DbError, EnumApiResponseCode.InternalError);
    }
  }

  public async GetAllUsers(): Promise<BaseApiResponse<Array<UserDto>>>{
    try {
      const users = await this.users.findMany();
      const userDtos = users.map((user) => new UserDto(user));
      return new BaseApiResponse<Array<UserDto>>(userDtos, EnumApiResponseMessage.Success, EnumApiResponseCode.Success);
    }
    catch(ex) {
      return new BaseApiResponse<Array<UserDto>>(null, EnumApiResponseMessage.DbError, EnumApiResponseCode.InternalError);
    }
  }
}

export default MainRepository;
