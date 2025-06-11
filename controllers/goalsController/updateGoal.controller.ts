import type { GoalProgress, GoalFailure } from "../../database/models/goal";
import { updateGoalProgressService, updateGoalFailureService } from "../../services/goalsService/updateGoal.service";

export function updateGoalByNameController({ name }: GoalProgress) {
  if(typeof name !== 'string') {
    throw new Error(`Check the @name of goal. Make sure it is a string`);
  };

  updateGoalProgressService({name: name});
  return;
};

export function updateGoalFailureByNameController({ name }: GoalFailure) {
  if(typeof name !== 'string') {
    throw new Error(`Check the @name of goal. Make sure it is a string`);
  };

  updateGoalFailureService({name: name});
  
  console.log('Failure updated. Please, try again to achieve the goal 🔥')
  return;
};

