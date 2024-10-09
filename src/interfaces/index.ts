export * from './LineItem';
export * from './Order';
export * from './Product';
export * from './Restaurant';
export * from './User';

export type Pagination<T = any> = {
  data: T[];
  meta_data: {
    total: number;
    page: number;
    limit: number;
  };
};
