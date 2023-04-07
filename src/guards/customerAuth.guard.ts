import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { EnumAccountStatus } from "src/enum/enumAccountStatus";
import { IJwtPayload } from "src/model/jwt.model";
import { AppConstaint } from "src/utils/constaint.utils";


@Injectable()
export class CustomerAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload:IJwtPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: AppConstaint.JwtSecret
        }
      );

      if((payload.Status | EnumAccountStatus.Customer) === EnumAccountStatus.Customer ) throw new UnauthorizedException('Not Customer');
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // @ts-ignore
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}