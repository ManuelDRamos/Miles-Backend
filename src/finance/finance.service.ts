import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FinancesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.finance.findMany();
  }

  create(data: any) {
    return this.prisma.finance.create({
      data: {
        amount: data.amount,
        concept: data.clientName,
        status: data.status,
      },
    });
  }

  async summary() {
    const total = await this.prisma.finance.aggregate({
      _sum: { amount: true },
    });

    return {
      revenue: total._sum.amount || 0,
    };
  }
}
