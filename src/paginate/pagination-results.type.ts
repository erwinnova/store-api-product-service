export type PaginationResultsType<PaginationEntity> = {
  results: PaginationEntity[];
  total: number;
  next?: string;
  previous?: string;
};
