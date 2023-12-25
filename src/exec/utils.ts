import { ApiProperty } from "@nestjs/swagger";

export class TaskRequest {
    @ApiProperty()
    name: string;
    @ApiProperty()
    parameters: any;
}

export function handleExecution(taskName: string, parameters: any) {
    let result;
    switch(taskName) {
        case 'addition':
            const sumArr = parameters as [];
            result = sumArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            break;
        case 'multiplication':
            const multArr = parameters as [];
            result = multArr.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
            break;
        default:
            result = null;
    }
    return result;
}
