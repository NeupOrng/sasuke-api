import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class HashService {
  private saltOrRounds = 10;

  async Hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRounds);
  }

  async Compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}