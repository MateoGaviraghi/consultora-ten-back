import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { EtapaValor } from '../entities/valor-nomenclador.entity';

export class CreateValorNomencladorDto {
  @IsNotEmpty()
  @IsUUID()
  nomencladorId: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsDateString()
  fechaVigencia: string;

  @IsOptional()
  @IsEnum(EtapaValor)
  etapa?: EtapaValor;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
