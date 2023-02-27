import { isArray, isEmpty, isObject } from 'class-validator';

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
