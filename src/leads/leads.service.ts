import { Injectable } from "@nestjs/common";
import { LeadStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string; email: string; message: string }) {
    return this.prisma.lead.create({ data });
  }

  findAll() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  update(id: string, status: LeadStatus) {
    return this.prisma.lead.update({
      where: { id },
      data: { status },
    });
  }
}
