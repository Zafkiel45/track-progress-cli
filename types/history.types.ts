export type historyType = 'create' | 'update' | 'delete' | 'failure' | 'all';

export interface History {
  target: string;
  datetime: string;
  type: string;
};