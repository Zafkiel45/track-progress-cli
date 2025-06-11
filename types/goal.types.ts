export interface GoalDelete {
  name: string;
};

export type GoalDetails = {
  name: string;
  created_at: string;
  failures: number; 
  type: string;
};