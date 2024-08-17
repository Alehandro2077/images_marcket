import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaModule } from 'src/1database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ProjectModule } from 'src/6project/project.module';
import { AuthModule } from 'src/2auth/auth.module';

@Module({
  imports: [PrismaModule, JwtModule, ProjectModule, AuthModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
