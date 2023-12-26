import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Post, Req, Res } from "@nestjs/common";
import { ExecService } from "./exec.service";
import { delay, handleExecution } from "./utils/operations";
import { Response } from "express";
import { DatabaseActionError } from "src/exceptions/CreateExecException";
import { v4 as uuidv4} from "uuid";
import { EXEC_STATUS, HTTP_REQUEST_PARAMS, TaskRequest } from "./utils/constants";

@Controller('exec')
export class ExecController {
    constructor(private execService: ExecService, private logger: Logger) {}

    /**
     * Get execution status by id
     * @param id 
     * @returns execution status
     */
    @Get('status/:id')
    async getExecStatusById(@Param(HTTP_REQUEST_PARAMS.ID) id: number) {
        const status = await this.execService.getExecStatusById(id);
        return {
            status
        };
    }

    /**
     * Get execution result by id
     * @param id 
     * @returns result
     */
    @Get('result/:id')
    async getExecResultById(@Param(HTTP_REQUEST_PARAMS.ID) id: number) {
        const result = await this.execService.getExecResultById(id);
        return {
            result
        }
    }

    /**
     * Create new execution by task name and parameters
     * @param body 
     * @param res 
     * @returns execution id, In case of task name and parameters dupilcation, return the result of the existing task, if task still runs return the uuid
     */
    @Post('run')
    @HttpCode(200)
    async executeTask(@Body() body: TaskRequest, @Res() res: Response) {
        const { name, parameters } = body;

        try {
            // Search for duplicate execution
            const existingExec = await this.execService.searchForDuplicateExec(name, parameters);

            if (existingExec) {
                const uuid = uuidv4();

                // If existing execution completed, send uuid and result, else send only uuid
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

            // Create new execution because there is no duplicate
            const exec = await this.execService.newTaskToExecute(name, parameters);
            this.logger.log('Execution task created successfully')

            // Send the execution id to the client but keep runing the execution task
            res.status(200).json({
                taskId: exec.id
            });

            // For simulation of long tasks
            // await delay(15000)

            // Execute the task by name and parameters and get the result
            const result = handleExecution(name, parameters);
            // Update execution status and result
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