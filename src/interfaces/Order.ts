import { LineItem } from './LineItem';

export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARED = 'PREPARED',
  DELIVERED = 'DELIVERED',
  IN_PREPARATION = 'IN_PREPARATION'
}

export enum OrderPackaging {
  TO_GO = 'TO_GO',
  EAT_HERE = 'EAT_HERE'
}

export interface Order {
  id: number;
  buyer_name: string;
  package_code: OrderPackaging;
  state_code: OrderStatus;
  line_items: LineItem[];
}
