import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './3user/user.module';
import { AuthModule } from './2auth/auth.module';
import { PrismaModule } from './1database/prisma.module';
import { SupplierModule } from './5supplier/supplier.module';
import { CreatorModule } from './4creator/creator.module';
import { JwtModule } from '@nestjs/jwt';
import { ProjectModule } from './6project/project.module';
import { TagModule } from './7tag/tag.module';
import { CartModule } from './8cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule,
    PrismaModule,
    UserModule,
    AuthModule,
    SupplierModule,
    CreatorModule,
    ProjectModule,
    TagModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
