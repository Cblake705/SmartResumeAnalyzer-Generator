import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './resume.entity';
import { UsersService } from '../users/users.service';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumesRepo: Repository<Resume>,
    private readonly usersService: UsersService,
  ) {}

  async createAndParse(
    userId: number,
    file: Express.Multer.File,
  ): Promise<Resume> {
    // Extract text from pdf
    const data = await pdfParse(file.buffer);
    const content = data.text;

    // Look up user, throw exception if not found
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const resume = this.resumesRepo.create({
      filename: file.originalname,
      content,
      user,
    });

    return this.resumesRepo.save(resume);
  }
  async findByUser(userId: number): Promise<Resume[]> {
    return this.resumesRepo.find({
      where: { user: { id: userId } },
      order: { uploadedAt: 'DESC' },
    });
  }
}
