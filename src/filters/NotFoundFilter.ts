import { Catch, NotFoundException } from "@nestjs/common";
import { ArgumentsHost, ExceptionFilter } from "@nestjs/common/interfaces";

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        response.status(404).json({
            status: 400,
            timesstamp: new Date().toISOString(),
            path: request.url,
            message: 'URL not found'
        });
    }
    
}