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
import { ValoresNomencladorService } from './valores-nomenclador.service';
import { CreateValorNomencladorDto } from './dto/create-valor-nomenclador.dto';
import { UpdateValorNomencladorDto } from './dto/update-valor-nomenclador.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Usuario } from '../auth/entities/usuario.entity';

// Interfaz para Request autenticado con usuario tipado
interface RequestWithUser extends Request {
  user: Usuario;
}

@Controller('valores-nomenclador')
@UseGuards(JwtAuthGuard)
export class ValoresNomencladorController {
  constructor(
    private readonly valoresNomencladorService: ValoresNomencladorService,
  ) {}

  @Post()
  create(@Body() createValorNomencladorDto: CreateValorNomencladorDto) {
    return this.valoresNomencladorService.create(createValorNomencladorDto);
  }

  @Get()
  findAll(
    @Request() req: RequestWithUser,
    @Query('nomencladorId') nomencladorId?: string,
    @Query('etapa') etapa?: string,
  ) {
    if (nomencladorId) {
      return this.valoresNomencladorService.findByNomenclador(
        nomencladorId,
        req.user,
      );
    }
    if (etapa) {
      return this.valoresNomencladorService.findByEtapa(etapa, req.user);
    }
    return this.valoresNomencladorService.findAll(req.user);
  }

  @Get('vigente/:nomencladorId')
  findVigente(
    @Request() req: RequestWithUser,
    @Param('nomencladorId') nomencladorId: string,
    @Query('fecha') fecha?: string,
  ) {
    return this.valoresNomencladorService.findVigenteByNomenclador(
      nomencladorId,
      fecha,
      req.user,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valoresNomencladorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateValorNomencladorDto: UpdateValorNomencladorDto,
  ) {
    return this.valoresNomencladorService.update(id, updateValorNomencladorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.valoresNomencladorService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.valoresNomencladorService.restore(id);
  }
}
