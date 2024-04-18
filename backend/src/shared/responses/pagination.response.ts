import { PageMeta } from './pagemeta';

export interface PaginationResponse<T = any> {
  items: T[];
  pageMeta: PageMeta;
}
