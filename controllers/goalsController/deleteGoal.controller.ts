import { deleteGoalService } from "../../services/goalsService/deleteGoals.service";
import type { GoalDelete } from "../../types/goal.types";

export function deleteGoalController({name}: GoalDelete) {
  if(typeof name !== 'string') {
    throw new Error(`Check the @name of goal. Make sure it is a string`);
  };

deleteGoalService({name: name});
  console.log('Goal deleted successfully ✅');
};