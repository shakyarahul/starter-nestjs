import { isArray, isEmpty, isObject } from 'class-validator';
import { SortByEnum } from '../dto/categories/GET/request.dto';

export const getLastUpdatedDate = (data: any, key = 'updated_at') => {
  if (isArray(data)) {
    const dates = data.map((v) => v.updated_at);
    const sortedDate = dates.sort();

    return isEmpty(sortedDate) ? '' : sortedDate.pop();
  } else if (isObject(data)) {
    return data[key];
  } else {
    return '';
  }
};

export const getSorting = async (
  sort_by,
  popularityKey: string,
): Promise<{ orderByKey: string; orderByValue: any }> => {
  switch (sort_by) {
    case SortByEnum.Latest:
      return { orderByKey: 'updated_at', orderByValue: 'DESC' };

    case SortByEnum.Popularity:
      return { orderByKey: popularityKey, orderByValue: 'DESC' };

    case SortByEnum.Oldest:
      return { orderByKey: 'updated_at', orderByValue: 'ASC' };

    default:
      return { orderByKey: 'updated_at', orderByValue: 'DESC' };
  }
};
