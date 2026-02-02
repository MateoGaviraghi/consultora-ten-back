import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValoresNomencladorService } from './valores-nomenclador.service';
import { ValoresNomencladorController } from './valores-nomenclador.controller';
import { ValorNomenclador } from './entities/valor-nomenclador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ValorNomenclador])],
  controllers: [ValoresNomencladorController],
  providers: [ValoresNomencladorService],
  exports: [ValoresNomencladorService],
})
export class ValoresNomencladorModule {}
