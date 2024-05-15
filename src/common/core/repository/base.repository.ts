export interface GetAllOptions<
  F extends object = object,
  I extends object = object,
> {
  filter?: F;
  include?: I;
}

export interface BaseFilterOptions {
  take?: number;
  skip?: number;
}
