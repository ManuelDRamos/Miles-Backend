import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async stats() {
    const [categories, photos, leads, bookings, revenue] = await Promise.all([
      this.prisma.category.count(),
      this.prisma.photo.count(),
      this.prisma.lead.count(),
      this.prisma.booking.count(),
      this.prisma.finance.aggregate({ _sum: { amount: true } }),
    ]);

    return {
      categories,
      photos,
      leads,
      bookings,
      revenue: revenue._sum.amount || 0,
    };
  }
}
