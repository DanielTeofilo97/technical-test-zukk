import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from 'src/utils/logger/logger.service';

export class LogHttpInterceptor implements NestInterceptor {
  private readonly logger: LoggerService;
  constructor() {
    this.logger = new LoggerService(LogHttpInterceptor.name);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        this.logger.log(`URL: ${request.url}`);
        this.logger.log(`METHOD: ${request.method}`);
        this.logger.log(`Execução levou : ${Date.now() - dt} milisegundos`);
      }),
    );
  }
}
