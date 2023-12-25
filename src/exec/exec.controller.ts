import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { ExecService } from "./exec.service";
import { TaskRequest } from "./utils";

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
    executeTask(@Body() req: TaskRequest) {
        console.log(req);
    }
}