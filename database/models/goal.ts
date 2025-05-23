export interface NewGoal {
  name: string; 
  target: number;
  created_at: string;
};

export interface Goal {
  goal_id: number;
  name: string;
  target: number;
  progress: number; 
  failures: number;
  last_failure: Date;
  created_at: Date; 
}; 

export interface GoalProgress {
  name: string;
  progress?: number; 
};

export interface GoalFailure {
  name: string;
  failure?: number;
  last_failure?: Date;
  progress?: 0;
};
