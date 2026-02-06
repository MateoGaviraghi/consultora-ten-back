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
import { PersonaTercerosVinculadoService } from './persona-terceros-vinculado.service';
import { CreatePersonaTercerosVinculadoDto } from './dto/create-persona-terceros-vinculado.dto';
import { UpdatePersonaTercerosVinculadoDto } from './dto/update-persona-terceros-vinculado.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnAdministradoraGuard } from '../../common/guards/own-administradora.guard';

@Controller('persona-terceros-vinculado')
@UseGuards(JwtAuthGuard)
export class PersonaTercerosVinculadoController {
  constructor(
    private readonly personaTercerosVinculadoService: PersonaTercerosVinculadoService,
  ) {}

  @Post()
  @UseGuards(OwnAdministradoraGuard)
  create(
    @Body()
    createPersonaTercerosVinculadoDto: CreatePersonaTercerosVinculadoDto,
  ) {
    return this.personaTercerosVinculadoService.create(
      createPersonaTercerosVinculadoDto,
    );
  }

  @Get()
  findAll(@Request() req: any) {
    return this.personaTercerosVinculadoService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.personaTercerosVinculadoService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(OwnAdministradoraGuard)
  update(
    @Param('id') id: string,
    @Body()
    updatePersonaTercerosVinculadoDto: UpdatePersonaTercerosVinculadoDto,
    @Request() req: any,
  ) {
    return this.personaTercerosVinculadoService.update(
      id,
      updatePersonaTercerosVinculadoDto,
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(OwnAdministradoraGuard)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.personaTercerosVinculadoService.remove(id, req.user);
  }
}
