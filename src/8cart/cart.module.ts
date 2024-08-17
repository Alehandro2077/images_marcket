import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from 'src/1database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/2auth/auth.module';
import { ProjectModule } from 'src/6project/project.module';

@Module({
  imports: [PrismaModule, JwtModule, AuthModule, ProjectModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [],
})
export class CartModule {}
