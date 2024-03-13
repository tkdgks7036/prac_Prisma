import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  message: string;
  statusCode: number;
  result: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const currentStatusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(map(data => ({
      message: "default message",
      statusCode: currentStatusCode,
      result: data.result || data
    })));
  }
}