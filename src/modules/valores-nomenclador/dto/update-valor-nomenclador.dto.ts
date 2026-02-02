import { PartialType } from '@nestjs/mapped-types';
import { CreateValorNomencladorDto } from './create-valor-nomenclador.dto';

export class UpdateValorNomencladorDto extends PartialType(
  CreateValorNomencladorDto,
) {}
