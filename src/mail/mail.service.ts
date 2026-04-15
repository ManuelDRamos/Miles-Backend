import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendBookingConfirmation(email: string, name: string, date: Date) {
    await this.transporter.sendMail({
      from: `"Miles Visual Producciones" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "📸 Confirmación de reserva",
      html: `
        <h2>Hola ${name} 👋</h2>
        <p>Tu reserva ha sido confirmada.</p>
        <p><strong>Fecha:</strong> ${date.toDateString()}</p>
        <p>Gracias por confiar en nosotros ✨</p>
      `,
    });
  }

  async sendBookingCancelled(email: string, name: string, date: Date) {
    await this.transporter.sendMail({
      to: email,
      subject: "❌ Reserva cancelada",
      html: `
      <h2>Hola ${name}</h2>
      <p>Tu reserva ha sido cancelada.</p>
      <p><strong>Fecha:</strong> ${date.toDateString()}</p>
    `,
    });
  }
}
