import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { ExecService } from "./exec.service";
import { TaskRequest, delay, handleExecution } from "./utils";
import { Response } from "express";

@Controller('exec')
export class ExecController {
    constructor(private execService: ExecService) {}

    // @Get('list')
    // getAvailableTasks() {
    //     return this.execService.getAvaiableTasks()
    // }

    @Get('status/:id')
    getTaskStatusById(@Param('id') id: number) {
        return this.execService.getTaskStatusById(id);
    }

    @Get('result/:id')
    getTaskResultById(@Param('id') id: string) {
        return this.execService.getTaskResultById(id);
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
            throw new HttpException({ error: 'Task execution failed' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    /* @Post('run')
    @HttpCode(200)
    async executeTask(@Body() req: TaskRequest) {
        const { name, parameters } = req;
        try {
            return await this.execService.executeTask(name, parameters);
        } catch (e) {
            throw new HttpException({ error: 'Task execution failed' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    } */
}