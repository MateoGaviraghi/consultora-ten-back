import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDiscapacidadService } from './tipo-discapacidad.service';
import { TipoDiscapacidadController } from './tipo-discapacidad.controller';
import { TipoDiscapacidad } from './entities/tipo-discapacidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDiscapacidad])],
  controllers: [TipoDiscapacidadController],
  providers: [TipoDiscapacidadService],
  exports: [TipoDiscapacidadService],
})
export class TipoDiscapacidadModule {}
