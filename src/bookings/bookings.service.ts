import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MailService } from "../mail/mail.service";

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  // 📂 Todas
  findAll() {
    return this.prisma.booking.findMany({
      orderBy: { date: "asc" },
    });
  }

  // ➕ Crear
  create(data: any) {
    return this.prisma.booking.create({
      data,
    });
  }

  // ✏️ Actualizar
  update(id: string, data: any) {
    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }

  // 📅 🔥 NUEVO → FILTRO POR MES
  async getByMonth(month: string) {
    const start = new Date(`${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    return this.prisma.booking.findMany({
      where: {
        date: {
          gte: start,
          lt: end,
        },
      },
      orderBy: { date: "asc" },
    });
  }

  // 📅 🔥 NUEVO → PRÓXIMAS RESERVAS
  async getUpcoming() {
    return this.prisma.booking.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: { date: "asc" },
      take: 5,
    });
  }

  // ✅ 🔥 NUEVO → CONFIRMAR RESERVA
  async confirm(id: string) {
    const booking = await this.prisma.booking.update({
      where: { id },
      data: {
        status: "CONFIRMED",
      },
    });

    // 🔥 enviar correo
    if (booking.email) {
      await this.mailService.sendBookingConfirmation(
        booking.email,
        booking.name,
        booking.date,
      );
    }

    return booking;
  }

  async cancel(id: string) {
    const booking = await this.prisma.booking.update({
      where: { id },
      data: {
        status: "CANCELLED",
      },
    });

    if (booking.email) {
      await this.mailService.sendBookingCancelled(
        booking.email,
        booking.name,
        booking.date,
      );
    }

    return booking;
  }
}
