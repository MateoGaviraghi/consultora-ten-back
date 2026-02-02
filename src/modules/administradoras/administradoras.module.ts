import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorasService } from './administradoras.service';
import { AdministradorasController } from './administradoras.controller';
import { Administradora } from './entities/administradora.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administradora])],
  controllers: [AdministradorasController],
  providers: [AdministradorasService],
  exports: [AdministradorasService],
})
export class AdministradorasModule {}
