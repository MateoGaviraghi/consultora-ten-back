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
  Query,
} from '@nestjs/common';
import { NomencladoresService } from './nomencladores.service';
import { CreateNomencladorDto } from './dto/create-nomenclador.dto';
import { UpdateNomencladorDto } from './dto/update-nomenclador.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('nomencladores')
@UseGuards(JwtAuthGuard)
export class NomencladoresController {
  constructor(private readonly nomencladoresService: NomencladoresService) {}

  @Post()
  create(@Body() createNomencladorDto: CreateNomencladorDto) {
    return this.nomencladoresService.create(createNomencladorDto);
  }

  @Get()
  findAll(
    @Query('categoriaId') categoriaId?: string,
    @Query('administradoraId') administradoraId?: string,
  ) {
    if (categoriaId) {
      return this.nomencladoresService.findByCategoria(categoriaId);
    }
    if (administradoraId) {
      return this.nomencladoresService.findByAdministradora(administradoraId);
    }
    return this.nomencladoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomencladoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNomencladorDto: UpdateNomencladorDto,
  ) {
    return this.nomencladoresService.update(id, updateNomencladorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.nomencladoresService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.nomencladoresService.restore(id);
  }
}
