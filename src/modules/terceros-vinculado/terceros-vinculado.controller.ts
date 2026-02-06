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
import { TercerosVinculadoService } from './terceros-vinculado.service';
import { CreateTercerosVinculadoDto } from './dto/create-terceros-vinculado.dto';
import { UpdateTercerosVinculadoDto } from './dto/update-terceros-vinculado.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnAdministradoraGuard } from '../../common/guards/own-administradora.guard';

@Controller('terceros-vinculado')
@UseGuards(JwtAuthGuard)
export class TercerosVinculadoController {
  constructor(
    private readonly tercerosVinculadoService: TercerosVinculadoService,
  ) {}

  @Post()
  @UseGuards(OwnAdministradoraGuard)
  create(
    @Body() createTercerosVinculadoDto: CreateTercerosVinculadoDto,
    @Request() req: any,
  ) {
    return this.tercerosVinculadoService.create(
      createTercerosVinculadoDto,
      req.user,
    );
  }

  @Get()
  findAll(@Request() req: any) {
    return this.tercerosVinculadoService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.tercerosVinculadoService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(OwnAdministradoraGuard)
  update(
    @Param('id') id: string,
    @Body() updateTercerosVinculadoDto: UpdateTercerosVinculadoDto,
    @Request() req: any,
  ) {
    return this.tercerosVinculadoService.update(
      id,
      updateTercerosVinculadoDto,
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(OwnAdministradoraGuard)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.tercerosVinculadoService.remove(id, req.user);
  }
}
