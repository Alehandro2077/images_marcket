import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/1database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AwsConfigService } from 'src/aws/aws.config.service';
import { FileUploadService } from './uppload.service';
import { TagModule } from 'src/7tag/tag.module';
import { AuthModule } from 'src/2auth/auth.module';

@Module({
  imports: [PrismaModule, JwtModule, AuthModule],
  controllers: [ProjectController],
  providers: [ProjectService, AwsConfigService, FileUploadService],
  exports: [ProjectService, FileUploadService],
})
export class ProjectModule {}
