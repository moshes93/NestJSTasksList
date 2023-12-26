import { ApiProperty } from "@nestjs/swagger";

export class TaskRequest {
    @ApiProperty()
    name: string;
    @ApiProperty()
    parameters: any;
}

export const TASK_NAME = {
    ADDITION: 'addition',
    MULTIPLICATION: 'multiplication'
};

export const EXEC_STATUS = {
    COMPLETED: 'completed',
    PENDING: 'pending'
};

export const EXEC_VALUES = {
    STATUS_DEFAULT_VALUE: 'pending'
};