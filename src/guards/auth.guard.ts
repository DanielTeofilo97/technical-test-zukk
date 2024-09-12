import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly useService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      request.user = await this.useService.listOne(data.id);
      request.tokenPayload = data;
      return true;
    } catch (error) {
      return false;
    }
  }
}
