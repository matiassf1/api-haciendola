export interface PaginationMetaDtoParameters {
    itemCount: number;
    page: number;
    take: number;
  }
  
  export class PaginationMetaDto {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
  
    constructor({ page, take, itemCount }: PaginationMetaDtoParameters) {
      this.page = page;
      this.take = take;
      this.itemCount = itemCount;
      this.pageCount = Math.ceil(this.itemCount / this.take);
    }
  }
  