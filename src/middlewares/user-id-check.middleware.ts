import { NestMiddleware } from '@nestjs/common';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('>> passando no middleware...');
    next();
  }
}
