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
import { Usuario } from '../auth/entities/usuario.entity';

// Interfaz para Request autenticado con usuario tipado
interface RequestWithUser extends Request {
  user: Usuario;
}

@Controller('terceros-vinculado')
@UseGuards(JwtAuthGuard)
export class TercerosVinculadoController {
  constructor(
    private readonly tercerosVinculadoService: TercerosVinculadoService,
  ) {}

  @Post()
  @UseGuards(OwnAdministradoraGuard)
  create(@Body() createTercerosVinculadoDto: CreateTercerosVinculadoDto) {
    return this.tercerosVinculadoService.create(createTercerosVinculadoDto);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.tercerosVinculadoService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.tercerosVinculadoService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(OwnAdministradoraGuard)
  update(
    @Param('id') id: string,
    @Body() updateTercerosVinculadoDto: UpdateTercerosVinculadoDto,
    @Request() req: RequestWithUser,
  ) {
    return this.tercerosVinculadoService.update(
      id,
      updateTercerosVinculadoDto,
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(OwnAdministradoraGuard)
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.tercerosVinculadoService.remove(id, req.user);
  }
}
