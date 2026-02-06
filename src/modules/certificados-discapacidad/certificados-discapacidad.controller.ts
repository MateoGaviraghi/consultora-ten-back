import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CertificadosDiscapacidadService } from './certificados-discapacidad.service';
import { CreateCertificadoDiscapacidadDto } from './dto/create-certificado-discapacidad.dto';
import { UpdateCertificadoDiscapacidadDto } from './dto/update-certificado-discapacidad.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnAdministradoraGuard } from '../../common/guards/own-administradora.guard';

@Controller('certificados-discapacidad')
@UseGuards(JwtAuthGuard)
export class CertificadosDiscapacidadController {
  constructor(
    private readonly certificadosDiscapacidadService: CertificadosDiscapacidadService,
  ) {}

  @Post()
  @UseGuards(OwnAdministradoraGuard)
  create(
    @Body() createCertificadoDiscapacidadDto: CreateCertificadoDiscapacidadDto,
  ) {
    return this.certificadosDiscapacidadService.create(
      createCertificadoDiscapacidadDto,
    );
  }

  @Get()
  findAll(@Request() req: any) {
    return this.certificadosDiscapacidadService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.certificadosDiscapacidadService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(OwnAdministradoraGuard)
  update(
    @Param('id') id: string,
    @Body() updateCertificadoDiscapacidadDto: UpdateCertificadoDiscapacidadDto,
    @Request() req: any,
  ) {
    return this.certificadosDiscapacidadService.update(
      id,
      updateCertificadoDiscapacidadDto,
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(OwnAdministradoraGuard)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.certificadosDiscapacidadService.remove(id, req.user);
  }
}
