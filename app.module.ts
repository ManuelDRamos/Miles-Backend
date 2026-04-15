import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./src/prisma/prisma.module";
import { AuthModule } from "./src/auth/auth.module";
import { PhotosModule } from "./src/photos/photos.module";
import { CategoriesModule } from "./src/categories/categories.module";
import { BookingsModule } from "./src/bookings/bookings.module";
import { ContentModule } from "./src/content/content.module";
import { DashboardModule } from "./src/dashboard/dashboard.module";
import { FinancesModule } from "./src/finance/finance.module";
import { LeadsModule } from "./src/leads/leads.module";
import { PlansModule } from "./src/plans/plans.module";
import { SettingsModule } from "./src/settings/settings.module";
import { SiteContentModule } from "./src/site-content/site-content.module";
import { StatsModule } from "./src/stats/stats.module";
import { UsersModule } from "./src/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    CategoriesModule,
    PhotosModule,
    ContentModule,
    LeadsModule,
    BookingsModule,
    FinancesModule,
    DashboardModule,
    PlansModule,
    SettingsModule,
    SiteContentModule,
    StatsModule,
    UsersModule,
  ],
})
export class AppModule {}
