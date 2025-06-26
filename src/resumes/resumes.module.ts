import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './resume.entity';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resume]), UsersModule],
  providers: [ResumesService],
  controllers: [ResumesController],
})
export class ResumesModule {}
