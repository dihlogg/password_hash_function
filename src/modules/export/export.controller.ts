import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExportService } from './export.service';
import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';

@Controller('ExportHashes')
export class ExportController {
  constructor(private service: ExportService) {}

  @Get()
  async export() {
    return this.service.exportHashes();
  }
}
