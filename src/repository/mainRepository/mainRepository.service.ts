import { ConfigService } from "@nestjs/config";
import { Injectable, NotFoundException } from "@nestjs/common";
import BaseRepository from "../baseRepository";
import { CreateUserDto, UserDto } from "src/model/mainRepository";
import BaseApiResponse from "src/model/apiResponse";
import { EnumApiResponseCode, EnumApiResponseMessage } from "src/enum/enumResponseMessage";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { CustomerSignInRequest } from "src/module/auth/model";
import { Prisma, Users } from "@prisma/client";
import HashService from "src/utils/hash.utils";
import { DbException } from "src/exception/DbException";

@Injectable()
class MainRepository extends BaseRepository
{
  constructor(
    private _configService: ConfigService,
    )
  {
    super(_configService.get('MAIN_DATABASE_URL'))
  }

  public async UpdateUser(updateUserRequest: Users): Promise<Users> {
    try {
      const user = await this.users.update({
        where: {
          UserId: updateUserRequest.UserId
        },
        data: {
          Status: updateUserRequest.Status,
          Profile: updateUserRequest.Profile,
          Email: updateUserRequest.Email,
          ModifiedOn: new Date(),
          ModifiedBy: updateUserRequest.ModifiedBy,
        }
      });

      return user;
    }
    catch {
      return null;
    }
  }

  public async GetUserByUsername(username: string): Promise<Users> {
    try {
      const targetUser = await this.users.findFirst({
        where: {
          Username: username,
        }
      });
      return targetUser;
    }
    catch {
      return null;
    }
  }

  public async CreateUser(createUserDto: CreateUserDto): Promise<Users>
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
      return newUser;
    }
    catch(ex) {
      throw new DbException(ex);
    }
  }

  public async SignInUser(request: CustomerSignInRequest): Promise<Users> {
    try {
      return await this.users.findFirst({where: {
        Email: request.Email
      }})
    }
    catch(ex) {
      console.error(`[${EnumApiResponseMessage.DbError}] ${ex}`);
      return null;
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
