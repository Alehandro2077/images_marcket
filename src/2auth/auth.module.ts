import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/1database/prisma.module';
import { UserModule } from 'src/3user/user.module';
import { CreatorModule } from 'src/4creator/creator.module';
import { SupplierModule } from 'src/5supplier/supplier.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, UserModule, CreatorModule, SupplierModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
