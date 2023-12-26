import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Post, Req, Res } from "@nestjs/common";
import { ExecService } from "./exec.service";
import { TaskRequest, delay, handleExecution } from "./utils";
import { Response } from "express";
import { DatabaseActionError } from "src/exceptions/CreateExecException";
import { v4 as uuidv4} from "uuid";

@Controller('exec')
export class ExecController {
    constructor(private execService: ExecService, private logger: Logger) {}

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
            const existingExec = await this.execService.searchForDuplicateExec(name, parameters);
            if (existingExec) {
                const uuid = uuidv4();

                if (existingExec.status === EXEC_STATUS.COMPLETED) {
                    this.logger.log(`Duplicate task was found, sedning client result, task id: ${existingExec.id}`, 'TaskExecution')
                    res.status(200).json({
                        uuid,
                        result: existingExec.result
                    });
                } else {
                    this.logger.log(`Duplicate task was found, but no completed, task id: ${existingExec.id}`, 'TaskExecution');
                    res.status(200).json({
                        uuid
                    });
                }
                return;
            }
            const exec = await this.execService.executeTask(name, parameters);
            this.logger.log('Execution task created successfully')
            res.status(200).json({
                taskId: exec.id
            });
            await delay(3000)
            const result = handleExecution(name, parameters);
            this.execService.updateCompletedExecution(exec.id, result);
            this.logger.log('Execution task finished and updated database successfully')
        } catch (e) {
            if (e instanceof DatabaseActionError) {
                this.logger.error(e.message, `Unable to run proccess with task '${name}' and parameters ${parameters}`, 'DatabaseActions');
            } else {
                this.logger.error(e);
            }
            throw new HttpException({ error: 'Task execution failed' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}