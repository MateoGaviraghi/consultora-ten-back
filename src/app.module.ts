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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
