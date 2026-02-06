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
  Request,
  Query,
} from '@nestjs/common';
import { TipoDiscapacidadService } from './tipo-discapacidad.service';
import { CreateTipoDiscapacidadDto } from './dto/create-tipo-discapacidad.dto';
import { UpdateTipoDiscapacidadDto } from './dto/update-tipo-discapacidad.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnAdministradoraGuard } from '../../common/guards/own-administradora.guard';

@Controller('tipo-discapacidad')
@UseGuards(JwtAuthGuard)
export class TipoDiscapacidadController {
  constructor(
    private readonly tipoDiscapacidadService: TipoDiscapacidadService,
  ) {}

  @Post()
  @UseGuards(OwnAdministradoraGuard)
  create(@Body() createTipoDiscapacidadDto: CreateTipoDiscapacidadDto) {
    return this.tipoDiscapacidadService.create(createTipoDiscapacidadDto);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('administradoraId') administradoraId?: string,
  ) {
    if (administradoraId) {
      return this.tipoDiscapacidadService.findByAdministradora(
        administradoraId,
        req.user,
      );
    }
    return this.tipoDiscapacidadService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.tipoDiscapacidadService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(OwnAdministradoraGuard)
  update(
    @Param('id') id: string,
    @Body() updateTipoDiscapacidadDto: UpdateTipoDiscapacidadDto,
  ) {
    return this.tipoDiscapacidadService.update(id, updateTipoDiscapacidadDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tipoDiscapacidadService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.tipoDiscapacidadService.restore(id);
  }
}
