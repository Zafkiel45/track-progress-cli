import type { GoalProgress, GoalFailure, NewGoal } from "../database/models/goal";
import { createNewGoal, deleteGoalService, updateGoalFailureService, updateGoalProgressService } from "../services/goals.services";
import type { GoalDelete } from "../types/goal.types";

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

export function createNewGoalController({name, target, created_at}: NewGoal) {

  if(typeof name !== 'string' || typeof target !== 'number') {
    throw new Error(`
      check the @name value and @targe value. Make sure the name is a string and 
      the target a number  
    `.trim());
  };

  createNewGoal({name: name, target: target, created_at});
  console.log('New Goal created successfully ✅');
  return; 
};

export function deleteGoalController({name}: GoalDelete) {
  if(typeof name !== 'string') {
    throw new Error(`Check the @name of goal. Make sure it is a string`);
  };

deleteGoalService({name: name});
  console.log('Goal deleted successfully ✅');
};