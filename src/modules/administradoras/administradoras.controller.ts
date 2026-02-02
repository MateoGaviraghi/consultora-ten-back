import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AdministradorasService } from './administradoras.service';
import { CreateAdministradoraDto } from './dto/create-administradora.dto';
import { UpdateAdministradoraDto } from './dto/update-administradora.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('administradoras')
@UseGuards(JwtAuthGuard)
export class AdministradorasController {
  constructor(
    private readonly administradorasService: AdministradorasService,
  ) {}

  @Post()
  create(@Body() createAdministradoraDto: CreateAdministradoraDto) {
    return this.administradorasService.create(createAdministradoraDto);
  }

  @Get()
  findAll() {
    return this.administradorasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administradorasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdministradoraDto: UpdateAdministradoraDto,
  ) {
    return this.administradorasService.update(id, updateAdministradoraDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.administradorasService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.administradorasService.restore(id);
  }
}
