import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { AdministradorasModule } from './modules/administradoras/administradoras.module';
import { NomencladoresModule } from './modules/nomencladores/nomencladores.module';
import { ValoresNomencladorModule } from './modules/valores-nomenclador/valores-nomenclador.module';
import { EstadoCivilModule } from './modules/estado-civil/estado-civil.module';
import { TipoDiscapacidadModule } from './modules/tipo-discapacidad/tipo-discapacidad.module';
import { TercerosVinculadoModule } from './modules/terceros-vinculado/terceros-vinculado.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    CategoriasModule,
    AdministradorasModule,
    NomencladoresModule,
    ValoresNomencladorModule,
    EstadoCivilModule,
    TipoDiscapacidadModule,
    TercerosVinculadoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
