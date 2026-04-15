import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async stats() {
    const [categories, photos, leads, bookings, finances, upcomingBookings] =
      await Promise.all([
        this.prisma.category.count(),

        this.prisma.photo.count({
          where: { isActive: true }, // 🔥 mejor práctica
        }),

        this.prisma.lead.count(),

        this.prisma.booking.count(),

        this.prisma.finance.findMany(), // 🔥 para separar pagado/pendiente

        this.prisma.booking.findMany({
          where: {
            date: {
              gte: new Date(), // 🔥 futuras
            },
          },
          orderBy: { date: "asc" },
          take: 5, // 🔥 como en la UI
        }),
      ]);

    // 🔥 separar ingresos
    const revenuePaid = finances
      .filter((f) => f.status === "PAID")
      .reduce((acc, f) => acc + f.amount, 0);

    const revenuePending = finances
      .filter((f) => f.status === "PENDING")
      .reduce((acc, f) => acc + f.amount, 0);

    return {
      categories,
      photos,
      leads,
      bookings,

      revenuePaid,
      revenuePending,

      // 🔥 mantener compatibilidad
      revenue: revenuePaid + revenuePending,

      upcomingBookings,
    };
  }
}
