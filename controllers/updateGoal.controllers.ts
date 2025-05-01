import { 
  updateGoalByNameService, 
  updateGoalFailureByNameService 
} from "../services/updateGoal.services";
import type { GoalFailure, GoalProgress } from "../database/models/goal";

export function updateGoalByNameController({ name }: GoalProgress) {
  if(typeof name !== 'string') {
    throw new Error(`Check the @name of goal. Make sure it is a string`);
  };

  updateGoalByNameService({name: name});
  return;
};

export function updateGoalFailureByNameController({ name }: GoalFailure) {
  if(typeof name !== 'string') {
    throw new Error(`Check the @name of goal. Make sure it is a string`);
  };

  updateGoalFailureByNameService({name: name});
  
  console.log('Failure updated. Please, try again to achieve the goal 🔥')
  return;
};