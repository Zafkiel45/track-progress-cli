import './database/migrations/database.migrations';
import { getDate } from './utils/getDate';
import { showGoals } from './scripts/showGoals';
import { createNewGoalController, deleteGoalController, updateGoalByNameController, updateGoalFailureByNameController } from './controllers/goals.controllers';

const args = process.argv.slice(2);

switch(args[0]) {
  case 'create-goal':
    createNewGoalController({
      name: args[1],
      target: parseInt(args[2]),
      created_at: getDate(),
    });
  break
  case 'show-goals':
    showGoals();
  break 
  case 'update-goal':
    updateGoalByNameController({name: args[1]})
  break
  case 'add-failure':
    updateGoalFailureByNameController({name: args[1]});
  break
  case 'delete-goal':
    deleteGoalController({name: args[1]});
  break 
  default:
    console.log('the command does not exist');
};