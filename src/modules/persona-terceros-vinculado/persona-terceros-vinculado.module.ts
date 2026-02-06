import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaTercerosVinculadoService } from './persona-terceros-vinculado.service';
import { PersonaTercerosVinculadoController } from './persona-terceros-vinculado.controller';
import { PersonaTercerosVinculado } from './persona-terceros-vinculado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonaTercerosVinculado])],
  controllers: [PersonaTercerosVinculadoController],
  providers: [PersonaTercerosVinculadoService],
  exports: [PersonaTercerosVinculadoService],
})
export class PersonaTercerosVinculadoModule {}
