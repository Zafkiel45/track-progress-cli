import './database/migrations/database.migrations';
import { createNewGoalController } from './controllers/createGoal.controllers';
import { getDate } from './utils/getDate';
import { showGoals } from './scripts/showGoals';

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
    console.log('========== Started the process 🟢 ==========')
    showGoals();
  break 
}