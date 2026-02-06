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
} from '@nestjs/common';
import { AdministradorasService } from './administradoras.service';
import { CreateAdministradoraDto } from './dto/create-administradora.dto';
import { UpdateAdministradoraDto } from './dto/update-administradora.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SuperAdminGuard } from '../../common/guards/super-admin.guard';
import { Usuario } from '../auth/entities/usuario.entity';

// Interfaz para Request autenticado con usuario tipado
interface RequestWithUser extends Request {
  user: Usuario;
}

@Controller('administradoras')
@UseGuards(JwtAuthGuard)
export class AdministradorasController {
  constructor(
    private readonly administradorasService: AdministradorasService,
  ) {}

  @Post()
  @UseGuards(SuperAdminGuard)
  create(@Body() createAdministradoraDto: CreateAdministradoraDto) {
    return this.administradorasService.create(createAdministradoraDto);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.administradorasService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.administradorasService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(SuperAdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateAdministradoraDto: UpdateAdministradoraDto,
  ) {
    return this.administradorasService.update(id, updateAdministradoraDto);
  }

  @Delete(':id')
  @UseGuards(SuperAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.administradorasService.remove(id);
  }

  @Patch(':id/restore')
  @UseGuards(SuperAdminGuard)
  restore(@Param('id') id: string) {
    return this.administradorasService.restore(id);
  }
}
