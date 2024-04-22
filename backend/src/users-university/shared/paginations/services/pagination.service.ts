import { FindOptionsWhere, Repository } from 'typeorm';
import { SortOrder } from '../enums/sort-order.enum';
import { Injectable } from '@nestjs/common';
import { PaginationResponse } from '../../../../shared/responses/pagination.response';
import { PaginationUserUniversityFilterDto } from '../dtos/pagination.dto';

@Injectable()
export class PaginationUserUniversityService {
  private createOrderQuery(filter: PaginationUserUniversityFilterDto) {
    const order: any = {};

    if (filter.orderBy) {
      order[filter.orderBy] = filter.sortOrder;
      return order;
    }

    // order.createdAt = SortOrder.DESC;
    order.updatedAt = SortOrder.DESC;
    return order;
  }

  async paginate<T>(
    repository: Repository<T>,
    filter: PaginationUserUniversityFilterDto,
    where: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<PaginationResponse<T>> {
    const [items, count] = await repository.findAndCount({
      order: this.createOrderQuery(filter),
      skip: (filter.page - 1) * filter.pageSize,
      take: filter.pageSize,
      where: where,
      relations,
    });
    const totalPage = Math.ceil(count / filter.pageSize);
    const response: PaginationResponse<T> = {
      items,
      pageMeta: {
        page: filter.page,
        totalPage: totalPage,
        totalItemInPage: items.length,
        totalItem: count,
        hasPreviousPage: filter.page > 1,
        hasNextPage: filter.page < totalPage,
      },
    };
    return response;
  }
}
