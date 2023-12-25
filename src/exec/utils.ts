import { ApiProperty } from "@nestjs/swagger";

export class TaskRequest {
    @ApiProperty()
    name: string;
    @ApiProperty()
    parameters: any;
}