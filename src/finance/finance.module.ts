import { Module } from "@nestjs/common";
import { FinancesService } from "./finance.service";
import { FinancesController } from "./finance.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FinancesController],
  providers: [FinancesService],
})
export class FinancesModule {}
