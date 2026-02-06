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

@Controller('afiliados')
@UseGuards(JwtAuthGuard)
export class AfiliadosController {
  constructor(private readonly afiliadosService: AfiliadosService) {}

  @Post()
  @UseGuards(OwnAdministradoraGuard)
  create(@Body() createAfiliadoDto: CreateAfiliadoDto, @Request() req: any) {
    return this.afiliadosService.create(createAfiliadoDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.afiliadosService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.afiliadosService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(OwnAdministradoraGuard)
  update(
    @Param('id') id: string,
    @Body() updateAfiliadoDto: UpdateAfiliadoDto,
    @Request() req: any,
  ) {
    return this.afiliadosService.update(id, updateAfiliadoDto, req.user);
  }

  @Delete(':id')
  @UseGuards(OwnAdministradoraGuard)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.afiliadosService.remove(id, req.user);
  }
}
