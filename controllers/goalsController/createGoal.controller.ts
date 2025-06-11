import { createNewGoal } from "../../services/goalsService/createGoal.service";
import type { NewGoal } from "../../database/models/goal";

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