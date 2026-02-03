import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValoresNomencladorService } from './valores-nomenclador.service';
import { ValoresNomencladorController } from './valores-nomenclador.controller';
import { ValorNomenclador } from './entities/valor-nomenclador.entity';
import { Nomenclador } from '../nomencladores/entities/nomenclador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ValorNomenclador, Nomenclador])],
  controllers: [ValoresNomencladorController],
  providers: [ValoresNomencladorService],
  exports: [ValoresNomencladorService],
})
export class ValoresNomencladorModule {}
