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
import { AfiliadosService } from './afiliados.service';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';
import { UpdateAfiliadoDto } from './dto/update-afiliado.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnAdministradoraGuard } from '../../common/guards/own-administradora.guard';
import { Usuario } from '../auth/entities/usuario.entity';

// Interfaz para Request autenticado con usuario tipado
interface RequestWithUser extends Request {
  user: Usuario;
}

@Controller('afiliados')
@UseGuards(JwtAuthGuard)
export class AfiliadosController {
  constructor(private readonly afiliadosService: AfiliadosService) {}

  @Post()
  @UseGuards(OwnAdministradoraGuard)
  create(@Body() createAfiliadoDto: CreateAfiliadoDto) {
    return this.afiliadosService.create(createAfiliadoDto);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.afiliadosService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.afiliadosService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(OwnAdministradoraGuard)
  update(
    @Param('id') id: string,
    @Body() updateAfiliadoDto: UpdateAfiliadoDto,
    @Request() req: RequestWithUser,
  ) {
    return this.afiliadosService.update(id, updateAfiliadoDto, req.user);
  }

  @Delete(':id')
  @UseGuards(OwnAdministradoraGuard)
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.afiliadosService.remove(id, req.user);
  }
}
