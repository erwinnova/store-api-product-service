import { PaginationResultsType } from './pagination-results.type';

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public total_view: number;
  public total: number;

  constructor(paginationResults: PaginationResultsType<PaginationEntity>) {
    this.results = paginationResults.results;
    this.total_view = paginationResults.results.length;
    this.total = paginationResults.total;
  }
}
