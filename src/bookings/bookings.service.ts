import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.booking.findMany();
  }

  create(data: any) {
    return this.prisma.booking.create({
      data: {
        name: data.clientName,
        email: data.email || "",
        date: new Date(data.date),
        status: data.status,
      },
    });
  }

  update(id: string, data: any) {
    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }
}
