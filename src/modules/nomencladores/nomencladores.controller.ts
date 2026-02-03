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
  Request,
} from '@nestjs/common';
import { NomencladoresService } from './nomencladores.service';
import { CreateNomencladorDto } from './dto/create-nomenclador.dto';
import { UpdateNomencladorDto } from './dto/update-nomenclador.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnAdministradoraGuard } from '../../common/guards/own-administradora.guard';

@Controller('nomencladores')
@UseGuards(JwtAuthGuard)
export class NomencladoresController {
  constructor(private readonly nomencladoresService: NomencladoresService) {}

  @Post()
  @UseGuards(OwnAdministradoraGuard)
  create(@Body() createNomencladorDto: CreateNomencladorDto) {
    return this.nomencladoresService.create(createNomencladorDto);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('categoriaId') categoriaId?: string,
    @Query('administradoraId') administradoraId?: string,
  ) {
    const user = req.user;

    if (categoriaId) {
      return this.nomencladoresService.findByCategoria(categoriaId, user);
    }
    if (administradoraId) {
      return this.nomencladoresService.findByAdministradora(
        administradoraId,
        user,
      );
    }
    return this.nomencladoresService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomencladoresService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(OwnAdministradoraGuard)
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
