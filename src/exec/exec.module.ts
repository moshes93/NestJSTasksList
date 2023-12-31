import { Module, Logger } from "@nestjs/common";
import { ExecController } from "./exec.controller";
import { ExecService } from "./exec.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exec } from "./exce.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Exec])],
    controllers: [ExecController],
    providers: [ExecService, Logger]
})
export class ExecModule {}