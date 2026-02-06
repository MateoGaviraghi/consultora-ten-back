import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TercerosVinculadoService } from './terceros-vinculado.service';
import { TercerosVinculadoController } from './terceros-vinculado.controller';
import { TercerosVinculado } from './entities/terceros-vinculado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TercerosVinculado])],
  controllers: [TercerosVinculadoController],
  providers: [TercerosVinculadoService],
  exports: [TercerosVinculadoService],
})
export class TercerosVinculadoModule {}
