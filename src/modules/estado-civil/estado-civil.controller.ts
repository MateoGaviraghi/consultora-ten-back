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
import { EstadoCivilService } from './estado-civil.service';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado-civil.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnAdministradoraGuard } from '../../common/guards/own-administradora.guard';
import { Usuario } from '../auth/entities/usuario.entity';

// Interfaz para Request autenticado con usuario tipado
interface RequestWithUser extends Request {
  user: Usuario;
}

@Controller('estado-civil')
@UseGuards(JwtAuthGuard)
export class EstadoCivilController {
  constructor(private readonly estadoCivilService: EstadoCivilService) {}

  @Post()
  @UseGuards(OwnAdministradoraGuard)
  create(@Body() createEstadoCivilDto: CreateEstadoCivilDto) {
    return this.estadoCivilService.create(createEstadoCivilDto);
  }

  @Get()
  findAll(
    @Request() req: RequestWithUser,
    @Query('administradoraId') administradoraId?: string,
  ) {
    if (administradoraId) {
      return this.estadoCivilService.findByAdministradora(
        administradoraId,
        req.user,
      );
    }
    return this.estadoCivilService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.estadoCivilService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(OwnAdministradoraGuard)
  update(
    @Param('id') id: string,
    @Body() updateEstadoCivilDto: UpdateEstadoCivilDto,
  ) {
    return this.estadoCivilService.update(id, updateEstadoCivilDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.estadoCivilService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.estadoCivilService.restore(id);
  }
}
