import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Get,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumesService } from './resumes.service';
import { Resume } from './resume.entity';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<Resume> {
    const userId = req.user.userId;
    return this.resumesService.createAndParse(userId, file);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req) {
    return this.resumesService.findByUser(req.user.userId);
  }
}
