import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exec } from "./exce.entity";
import { Task } from "src/task/task.entity";
import { DatabaseActionError } from "src/exceptions/CreateExecException";
import { EXEC_STATUS } from "./utils/constants";

@Injectable({})
export class ExecService {
    constructor(@InjectRepository(Exec) private execRepository: Repository<Exec>) {}

    /**
     * Create entity of execution with task and save it in database
     * @param name 
     * @param parameters 
     * @returns newly created execution
     */
    async newTaskToExecute(name: string, parameters: object) {
        try {
            const exec = new Exec();
            const task = new Task();
            task.name = name;
            exec.parameters = parameters;
            exec.task = task;
            return await this.execRepository.save(exec);
        }
        catch (e) {
            throw new DatabaseActionError('Error on creating new execution task in database', e);
        }
    }

    /**
     * Update the execution status and result
     * @param execId 
     * @param result 
     * @returns the updated execution
     */
    async updateCompletedExecution(execId: number, result: string) {
        try {
            const exec = await this.getExec(execId);
            if (exec) {
                exec.result = result;
                exec.status = EXEC_STATUS.COMPLETED;
                return this.execRepository.save(exec);
            }
        } catch (e) {
            throw new DatabaseActionError('Error on updating execution task in database', e);
        }
    }

    /**
     * Search for execution with given name and parametees
     * @param name 
     * @param parameters 
     * @returns the execution record if exists and null if there is no result
     */
    async searchForDuplicateExec(name: string, parameters: object) {
        try {
            const exec = await this.execRepository.createQueryBuilder()
                .where('taskName = :name', {name})
                .andWhere('parameters = :parameters', {parameters: JSON.stringify(parameters)})
                .getOne()
            return exec;
        } catch (e) {
            throw new DatabaseActionError('Error on searching by exec id and parameters', e);
        }
    }

    async getExec(execId: number) {
        const exec = await this.execRepository.findOne({where: {id: execId}})
        return exec;
    }

    async getExecStatusById(execId: number) {
        const exec = await this.getExec(execId);
        return exec.status;
    }

    async getExecResultById(execId: number) {
        const exec = await this.getExec(execId);
        return exec.result;
    }
}