import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FinancesService {
  constructor(private prisma: PrismaService) {}

  // 📂 Listar movimientos
  findAll() {
    return this.prisma.finance.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // ➕ Crear movimiento
  create(data: { amount: number; concept: string; status?: "PENDING" }) {
    return this.prisma.finance.create({
      data,
    });
  }

  // ✏️ Actualizar estado o info
  update(id: string, data: any) {
    return this.prisma.finance.update({
      where: { id },
      data,
    });
  }

  // ❌ Eliminar movimiento
  remove(id: string) {
    return this.prisma.finance.delete({
      where: { id },
    });
  }

  // 📊 🔥 RESUMEN (CLAVE PARA DASHBOARD)
  async getSummary() {
    const [total, paid, pending] = await Promise.all([
      this.prisma.finance.aggregate({
        _sum: { amount: true },
      }),
      this.prisma.finance.aggregate({
        _sum: { amount: true },
        where: { status: "PAID" },
      }),
      this.prisma.finance.aggregate({
        _sum: { amount: true },
        where: { status: "PENDING" },
      }),
    ]);

    return {
      total: total._sum.amount || 0,
      paid: paid._sum.amount || 0,
      pending: pending._sum.amount || 0,
    };
  }
}
