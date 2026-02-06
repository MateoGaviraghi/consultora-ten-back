import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificadoDiscapacidadDto } from './create-certificado-discapacidad.dto';

export class UpdateCertificadoDiscapacidadDto extends PartialType(
  CreateCertificadoDiscapacidadDto,
) {}
