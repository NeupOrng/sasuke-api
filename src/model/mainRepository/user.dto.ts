import { ApiProperty } from "@nestjs/swagger";
import { Users } from "@prisma/client";

export class UserDto {
  @ApiProperty({ name: "Username" })
  Username: string;

  @ApiProperty({ name: "Email" })
  Email: string;

  @ApiProperty({ name: "Status" })
  Status: Number;

  @ApiProperty({ name: "CreatedOn" })
  CreatedOn: Date;

  @ApiProperty({ name: "ModifiedOn" })
  ModifiedOn: Date;

  @ApiProperty({ name: "IsNewUser" })
  get IsNewUser(): Boolean {
    const currentDate = new Date();
    const weekFromNow = new Date(currentDate.setDate(currentDate.getDate() + 14));
    return this.CreatedOn < weekFromNow;
  }

  toJSON() {
    return {
      Username: this.Username,
      Email: this.Email,
      Status: this.Status,
      CreatedOn: this.CreatedOn,
      ModifiedOn: this.ModifiedOn,
      IsNewUser: this.IsNewUser,
    };
  }

  constructor(user: Users) {
    this.Username = user.Username;
    this.Email = user.Email;
    this.Status = user.Status;
    this.CreatedOn = user.CreatedOn;
    this.ModifiedOn = user.ModifiedOn;
  }
}

export class UserDtoResponse extends UserDto{
  @ApiProperty({ name: "Token" })
  Token: string;

  toJSON() {
    return {
      Username: this.Username,
      Email: this.Email,
      Status: this.Status,
      CreatedOn: this.CreatedOn,
      ModifiedOn: this.ModifiedOn,
      IsNewUser: this.IsNewUser,
      Token: this.Token,
    };
  }

  constructor(user: Users, token: string) {
    super(user);

    this.Token = token;
  }
}
