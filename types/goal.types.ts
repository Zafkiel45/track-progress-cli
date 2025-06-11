export interface GoalInfo {
  name: string;
  progress: number;
  target: number;
  created_at: string;
  failures: number;
  type: string;
};

export interface GoalDelete {
  name: string;
};

export type GoalDetails = {
  name: string;
  created_at: string;
  failures: number; 
};