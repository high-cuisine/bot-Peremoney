import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { timestamp } from "rxjs";


@Catch(HttpException)
export class AllHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = Number(exception.getStatus());
        const errRes = exception.getResponse() as
        | string
        | {message: string; [key: string]: any};

        // res.status(status).json({
        //     status: status,
        //     timestamp: new Date().toISOString(),
        //     path: req.url,
        //     ...(typeof errRes === 'string'
        //     ? { message: errRes}
        //     : {...errRes})
        // })
    }
}