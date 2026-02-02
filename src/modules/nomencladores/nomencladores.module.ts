import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomencladoresService } from './nomencladores.service';
import { NomencladoresController } from './nomencladores.controller';
import { Nomenclador } from './entities/nomenclador.entity';
import { CategoriasModule } from '../categorias/categorias.module';
import { AdministradorasModule } from '../administradoras/administradoras.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nomenclador]),
    CategoriasModule,
    AdministradorasModule,
  ],
  controllers: [NomencladoresController],
  providers: [NomencladoresService],
  exports: [NomencladoresService],
})
export class NomencladoresModule {}
