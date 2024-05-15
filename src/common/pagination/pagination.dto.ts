import { PaginationMetaDto } from './pagination-meta.dto';

export class PaginationDto<Entity extends object> {
  readonly data: Entity[];
  readonly meta: PaginationMetaDto;

  constructor(data: Entity[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
