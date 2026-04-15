import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.plan.create({ data });
  }

  findAll() {
    return this.prisma.plan.findMany();
  }

  update(id: string, data: any) {
    return this.prisma.plan.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.plan.delete({
      where: { id },
    });
  }
}
