import { updateGoalByNameService } from "../services/updateGoal.services";
import type { GoalProgress } from "../database/models/goal";

export function updateGoalByNameController({ name }: GoalProgress) {
  if(typeof name !== 'string') {
    throw new Error(`Check the @name of goal. Make sure it is a string`);
  };

  updateGoalByNameService({name: name});
  return;
};