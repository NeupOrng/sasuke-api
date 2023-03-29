enum EnumApiResponseMessage {
  Success = 'success',
  NoAuth = 'unauthorize request',
  NoUser = 'user not found',
  DuplicateUser = 'duplicate user',
  DuplicateOn = 'duplicate on ',
  DbError = 'Database Exception',
  IncorrectPawssword = 'Incorrect Password'
}

enum EnumApiResponseCode {
  Success = 200,
  NoAuth = 401,
  NoUser = 403,
  DuplicateUser = 1000,
  InternalError = 500,
  IncorrectPawssword = 2000
}

export {
  EnumApiResponseCode,
  EnumApiResponseMessage,
}
