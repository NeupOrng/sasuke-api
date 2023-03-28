
export class CreateUserDto {
  Username: string;
  Email: string;
  Password: string;
  CreatedBy: string;
  CreatedOn: Date;
  ModifiedBy: string;
  ModifiedOn: Date;

  constructor(
    username: string,
    email: string,
    password: string,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date
    ) {
      this.Username = username;
      this.Email = email;
      this.Password = password;
      this.CreatedBy = createdBy;
      this.CreatedOn = createdOn;
      this.ModifiedBy = modifiedBy;
      this.ModifiedOn = modifiedOn;
    }
}