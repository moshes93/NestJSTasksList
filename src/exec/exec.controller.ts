import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { ExecService } from "./exec.service";
import { TaskRequest, delay, handleExecution } from "./utils";
import { Response } from "express";
import { DatabaseActionError } from "src/exceptions/CreateExecException";

@Controller('exec')
export class ExecController {
    constructor(private execService: ExecService) {}

    @Get('status/:id')
    async getExecStatusById(@Param('id') id: number) {
        const status = await this.execService.getExecStatusById(id);
        return {
            status
        };
    }

    @Get('result/:id')
    async getExecResultById(@Param('id') id: number) {
        const result = await this.execService.getExecResultById(id);
        return {
            result
        }
    }

    @Post('run')
    @HttpCode(200)
    async executeTask(@Body() body: TaskRequest, @Res() res: Response) {
        const { name, parameters } = body;
        try {
            const exec = await this.execService.executeTask(name, parameters);
            res.status(200).json({
                taskId: exec.id
            });
            await delay(3000)
            const result = handleExecution(name, parameters);
            this.execService.updateCompletedTask(exec.id, result);
        } catch (e) {
            // To handle logger
            if (e instanceof DatabaseActionError) {
                console.log(e);
            }
            throw new HttpException({ error: 'Task execution failed' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}