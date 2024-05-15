import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { DEFAULT_PAGE, DEFAULT_TAKE } from 'common/common.constants';


export class BaseFilterParamsDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = DEFAULT_PAGE;

  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take?: number = DEFAULT_TAKE;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
