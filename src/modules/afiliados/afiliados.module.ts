import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfiliadosService } from './afiliados.service';
import { AfiliadosController } from './afiliados.controller';
import { Afiliado } from './entities/afiliado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Afiliado])],
  controllers: [AfiliadosController],
  providers: [AfiliadosService],
  exports: [AfiliadosService],
})
export class AfiliadosModule {}
