import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificadosDiscapacidadService } from './certificados-discapacidad.service';
import { CertificadosDiscapacidadController } from './certificados-discapacidad.controller';
import { CertificadoDiscapacidad } from './certificado-discapacidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CertificadoDiscapacidad])],
  controllers: [CertificadosDiscapacidadController],
  providers: [CertificadosDiscapacidadService],
  exports: [CertificadosDiscapacidadService],
})
export class CertificadosDiscapacidadModule {}
